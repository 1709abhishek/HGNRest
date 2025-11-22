const mockAggregate = jest.fn();

jest.mock('../models/application', () => ({
  aggregate: (...args) => mockAggregate(...args),
}));

const { aggregateByCountry } = require('./applicationsService');

describe('applicationsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('aggregateByCountry', () => {
    const mockRange = {
      start: new Date('2024-01-01'),
      end: new Date('2024-12-31'),
    };

    it('should aggregate applications by country without role filter', async () => {
      const mockResult = [
        { country: 'USA', count: 100 },
        { country: 'Canada', count: 50 },
      ];

      mockAggregate.mockResolvedValue(mockResult);

      const result = await aggregateByCountry(mockRange);

      expect(mockAggregate).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });

    it('should aggregate applications by country with role filter', async () => {
      const mockResult = [{ country: 'USA', count: 30 }];
      const roles = ['Developer', 'Designer'];

      mockAggregate.mockResolvedValue(mockResult);

      const result = await aggregateByCountry(mockRange, roles);

      expect(mockAggregate).toHaveBeenCalled();
      const aggregatePipeline = mockAggregate.mock.calls[0][0];
      const matchStage = aggregatePipeline.find((stage) => stage.$match);
      expect(matchStage.$match.role).toEqual({ $in: roles });
      expect(result).toEqual(mockResult);
    });

    it('should return empty array when no applications found', async () => {
      mockAggregate.mockResolvedValue([]);
      const result = await aggregateByCountry(mockRange);
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockAggregate.mockRejectedValue(new Error('Database error'));
      await expect(aggregateByCountry(mockRange)).rejects.toThrow('Database error');
    });

    it('should sort results by count descending', async () => {
      mockAggregate.mockResolvedValue([]);
      await aggregateByCountry(mockRange);

      const aggregatePipeline = mockAggregate.mock.calls[0][0];
      const sortStage = aggregatePipeline.find((stage) => stage.$sort);
      expect(sortStage.$sort).toEqual({ count: -1 });
    });
  });
});
