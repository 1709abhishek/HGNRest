const mockFind = jest.fn();
const mockFindById = jest.fn();
const mockFindByIdAndUpdate = jest.fn();
const mockLogException = jest.fn();

jest.mock('../models/userProfile', () => ({
  find: (...args) => mockFind(...args),
  findById: (...args) => mockFindById(...args),
  findByIdAndUpdate: (...args) => mockFindByIdAndUpdate(...args),
}));

jest.mock('../startup/logger', () => ({
  logException: (...args) => mockLogException(...args),
}));

const {
  getUserIdAndEmailByEmails,
  getUserFullNameAndEmailById,
  updateBioPostedStatus,
} = require('./userService');

describe('userService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserIdAndEmailByEmails', () => {
    it('should return user profiles with _id and email for valid email list', async () => {
      const mockEmails = ['test1@example.com', 'test2@example.com'];
      const mockUsers = [
        { _id: 'user1', email: 'test1@example.com' },
        { _id: 'user2', email: 'test2@example.com' },
      ];

      mockFind.mockResolvedValue(mockUsers);

      const result = await getUserIdAndEmailByEmails(mockEmails);

      expect(mockFind).toHaveBeenCalledWith({ email: { $in: mockEmails } }, '_id email');
      expect(result).toEqual(mockUsers);
    });

    it('should throw error if userEmails is not an array', async () => {
      await expect(getUserIdAndEmailByEmails('not-an-array')).rejects.toThrow(
        'Invalid user email list',
      );
      await expect(getUserIdAndEmailByEmails(null)).rejects.toThrow('Invalid user email list');
      await expect(getUserIdAndEmailByEmails(undefined)).rejects.toThrow('Invalid user email list');
    });

    it('should return empty array when no users found', async () => {
      mockFind.mockResolvedValue([]);
      const result = await getUserIdAndEmailByEmails(['nonexistent@example.com']);
      expect(result).toEqual([]);
    });

    it('should handle database errors', async () => {
      mockFind.mockRejectedValue(new Error('Database connection failed'));
      await expect(getUserIdAndEmailByEmails(['test@example.com'])).rejects.toThrow(
        'Could not fetch user profiles: Database connection failed',
      );
    });
  });

  describe('getUserFullNameAndEmailById', () => {
    it('should return user profile with firstName, lastName, and email', async () => {
      const mockUser = { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com' };
      mockFindById.mockResolvedValue(mockUser);

      const result = await getUserFullNameAndEmailById('user123');

      expect(mockFindById).toHaveBeenCalledWith('user123', 'firstName lastName email');
      expect(result).toEqual(mockUser);
    });

    it('should return null when user not found', async () => {
      mockFindById.mockResolvedValue(null);
      const result = await getUserFullNameAndEmailById('nonexistent-id');
      expect(result).toBeNull();
    });

    it('should return null and log error on database failure', async () => {
      const mockError = new Error('Database error');
      mockFindById.mockRejectedValue(mockError);

      const result = await getUserFullNameAndEmailById('user123');

      expect(result).toBeNull();
      expect(mockLogException).toHaveBeenCalledWith(mockError, 'Error getting user full name');
    });
  });

  describe('updateBioPostedStatus', () => {
    it('should update bioPosted to valid status successfully', async () => {
      const mockUpdatedUser = { _id: 'user123', bioPosted: 'posted' };
      mockFindByIdAndUpdate.mockResolvedValue(mockUpdatedUser);

      const result = await updateBioPostedStatus('user123', 'posted');

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        'user123',
        { bioPosted: 'posted' },
        { new: true, runValidators: true },
      );
      expect(result).toEqual(mockUpdatedUser);
    });

    it('should throw error for invalid bioPosted value', async () => {
      await expect(updateBioPostedStatus('user123', 'invalid')).rejects.toThrow(
        'Invalid bioPosted value.',
      );
    });

    it('should throw error when user is not found', async () => {
      mockFindByIdAndUpdate.mockResolvedValue(null);
      await expect(updateBioPostedStatus('nonexistent-id', 'posted')).rejects.toThrow(
        'User not found.',
      );
    });

    it('should propagate database errors', async () => {
      mockFindByIdAndUpdate.mockRejectedValue(new Error('Database error'));
      await expect(updateBioPostedStatus('user123', 'posted')).rejects.toThrow('Database error');
    });
  });
});
