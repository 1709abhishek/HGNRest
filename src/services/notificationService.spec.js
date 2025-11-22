const mongoose = require('mongoose');

const mockInsertMany = jest.fn();
const mockFind = jest.fn();
const mockFindOneAndUpdate = jest.fn();
const mockFindByIdAndDelete = jest.fn();
const mockCleanHtml = jest.fn((html) => html);
const mockStartSession = jest.fn();

jest.mock('../models/notification', () => ({
  insertMany: (...args) => mockInsertMany(...args),
  find: (...args) => mockFind(...args),
  findOneAndUpdate: (...args) => mockFindOneAndUpdate(...args),
  findByIdAndDelete: (...args) => mockFindByIdAndDelete(...args),
}));

jest.mock('../utilities/htmlContentSanitizer', () => ({
  cleanHtml: (...args) => mockCleanHtml(...args),
}));

// Mock mongoose startSession
mongoose.startSession = mockStartSession;

const {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} = require('./notificationService');

describe('notificationService', () => {
  const validSenderId = new mongoose.Types.ObjectId().toString();
  const validRecipientId = new mongoose.Types.ObjectId().toString();
  const validNotificationId = new mongoose.Types.ObjectId().toString();
  let mockSession;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSession = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      abortTransaction: jest.fn().mockResolvedValue(undefined),
      endSession: jest.fn(),
    };
    mockStartSession.mockResolvedValue(mockSession);
  });

  describe('createNotification', () => {
    it('should create notifications for valid inputs', async () => {
      const mockResult = [{ _id: 'notif1', message: 'Test' }];
      mockInsertMany.mockResolvedValue(mockResult);

      const result = await createNotification(validSenderId, [validRecipientId], 'Test message');

      expect(mockStartSession).toHaveBeenCalled();
      expect(mockSession.startTransaction).toHaveBeenCalled();
      expect(mockInsertMany).toHaveBeenCalled();
      expect(mockSession.commitTransaction).toHaveBeenCalled();
      expect(result).toEqual(mockResult);
    });

    it('should throw error for invalid sender ID', async () => {
      await expect(createNotification('invalid-id', [validRecipientId], 'message')).rejects.toThrow(
        'Invalid sender ID',
      );
    });

    it('should throw error for invalid recipient IDs', async () => {
      await expect(createNotification(validSenderId, ['invalid-id'], 'message')).rejects.toThrow(
        'Invalid recipient ID',
      );
      await expect(createNotification(validSenderId, [], 'message')).rejects.toThrow(
        'Invalid recipient ID',
      );
    });

    it('should rollback transaction on error', async () => {
      mockInsertMany.mockRejectedValue(new Error('Insert failed'));

      await expect(
        createNotification(validSenderId, [validRecipientId], 'message'),
      ).rejects.toThrow('Could not create notification: Insert failed');

      expect(mockSession.abortTransaction).toHaveBeenCalled();
    });
  });

  describe('getNotifications', () => {
    it('should return notifications for valid user ID', async () => {
      const mockNotifications = [{ _id: 'notif1' }];
      const mockQuery = {
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockNotifications),
      };
      mockFind.mockReturnValue(mockQuery);

      const result = await getNotifications(validRecipientId);

      expect(mockFind).toHaveBeenCalledWith({ recipient: validRecipientId });
      expect(result).toEqual(mockNotifications);
    });

    it('should throw error for invalid user ID', async () => {
      await expect(getNotifications('invalid-id')).rejects.toThrow('Invalid user ID');
    });
  });

  describe('markNotificationAsRead', () => {
    it('should mark notification as read successfully', async () => {
      const mockUpdated = { _id: validNotificationId, isRead: true };
      mockFindOneAndUpdate.mockResolvedValue(mockUpdated);

      const result = await markNotificationAsRead(validNotificationId, validRecipientId);

      expect(mockFindOneAndUpdate).toHaveBeenCalledWith(
        { _id: validNotificationId, recipient: validRecipientId },
        { isRead: true },
        { new: true },
      );
      expect(result).toEqual(mockUpdated);
    });

    it('should throw error for invalid notification ID', async () => {
      await expect(markNotificationAsRead('invalid-id', validRecipientId)).rejects.toThrow(
        'Invalid notification ID',
      );
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification successfully', async () => {
      const mockDeleted = { _id: validNotificationId };
      mockFindByIdAndDelete.mockResolvedValue(mockDeleted);

      const result = await deleteNotification(validNotificationId);

      expect(mockFindByIdAndDelete).toHaveBeenCalledWith(validNotificationId);
      expect(result).toEqual(mockDeleted);
    });

    it('should throw error for invalid notification ID', async () => {
      await expect(deleteNotification('invalid-id')).rejects.toThrow('Invalid notification ID');
    });
  });
});
