const mockAxios = jest.fn();

jest.mock(
  'axios',
  () =>
    (...args) =>
      mockAxios(...args),
);

const { getTeams, findMemberByEmail, checkUserExists, getUserDetails } = require('./sentryService');

describe('sentryService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SENTRY_API_TOKEN = 'test-token';
    process.env.SENTRY_ORG_SLUG = 'test-org';
  });

  describe('getTeams', () => {
    it('should return teams list', async () => {
      const mockTeams = [{ id: 1, name: 'Team A', slug: 'team-a' }];
      mockAxios.mockResolvedValue({ data: mockTeams });

      const result = await getTeams();

      expect(result).toEqual(mockTeams);
    });

    it('should throw ForbiddenError on 403', async () => {
      mockAxios.mockRejectedValue({ response: { status: 403 } });

      await expect(getTeams()).rejects.toThrow();
      try {
        await getTeams();
      } catch (error) {
        expect(error.name).toBe('ForbiddenError');
      }
    });
  });

  describe('findMemberByEmail', () => {
    it('should find member by email', async () => {
      const mockMembers = [{ id: '1', email: 'test@example.com' }];
      mockAxios.mockResolvedValue({ data: mockMembers });

      const result = await findMemberByEmail('test@example.com');

      expect(result).toEqual(mockMembers[0]);
    });

    it('should throw ValidationError for empty email', async () => {
      await expect(findMemberByEmail('')).rejects.toThrow();
      try {
        await findMemberByEmail('');
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }
    });

    it('should return undefined when not found', async () => {
      mockAxios.mockResolvedValue({ data: [] });

      const result = await findMemberByEmail('notfound@example.com');

      expect(result).toBeUndefined();
    });
  });

  describe('checkUserExists', () => {
    it('should return exists true for existing user', async () => {
      const mockMember = { id: '1', email: 'test@example.com', pending: false };
      mockAxios.mockResolvedValue({ data: [mockMember] });

      const result = await checkUserExists('test@example.com');

      expect(result.exists).toBe(true);
      expect(result.status).toBe('active');
    });

    it('should return pending status', async () => {
      const mockMember = { id: '1', email: 'test@example.com', pending: true };
      mockAxios.mockResolvedValue({ data: [mockMember] });

      const result = await checkUserExists('test@example.com');

      expect(result.status).toBe('pending');
    });

    it('should return exists false when not found', async () => {
      mockAxios.mockResolvedValue({ data: [] });

      const result = await checkUserExists('notfound@example.com');

      expect(result.exists).toBe(false);
    });
  });

  describe('getUserDetails', () => {
    it('should throw ValidationError for empty email', async () => {
      await expect(getUserDetails('')).rejects.toThrow();
      try {
        await getUserDetails('');
      } catch (error) {
        expect(error.name).toBe('ValidationError');
      }
    });

    it('should throw NotFoundError when user not found', async () => {
      mockAxios.mockResolvedValue({ data: [] });

      await expect(getUserDetails('notfound@example.com')).rejects.toThrow();
      try {
        await getUserDetails('notfound@example.com');
      } catch (error) {
        expect(error.name).toBe('NotFoundError');
      }
    });

    it('should return user details', async () => {
      const mockMember = {
        id: '1',
        email: 'user@example.com',
        name: 'Test User',
        orgRole: 'member',
        pending: false,
        dateCreated: '2024-01-01',
      };
      mockAxios
        .mockResolvedValueOnce({ data: [mockMember] })
        .mockResolvedValueOnce({ data: { teams: [] } });

      const result = await getUserDetails('user@example.com');

      expect(result.email).toBe('user@example.com');
      expect(result.status).toBe('active');
    });
  });
});
