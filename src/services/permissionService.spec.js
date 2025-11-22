const mockHasPermission = jest.fn();
const mockCanRequestorUpdateUser = jest.fn();
const mockLogInfo = jest.fn();
const mockLogUserPermissionChange = jest.fn();
const mockRemoveCache = jest.fn();
const mockHasCache = jest.fn();
const mockGetCache = jest.fn();
const mockSetCache = jest.fn();
const mockNotifyInfringements = jest.fn();

jest.mock(
  '../utilities/logUserPermissionChangeByAccount',
  () =>
    (...args) =>
      mockLogUserPermissionChange(...args),
);

jest.mock('../utilities/permissions', () => ({
  hasPermission: (...args) => mockHasPermission(...args),
  canRequestorUpdateUser: (...args) => mockCanRequestorUpdateUser(...args),
}));

jest.mock('../startup/logger', () => ({
  logInfo: (...args) => mockLogInfo(...args),
}));

jest.mock('../utilities/nodeCache', () => () => ({
  removeCache: (...args) => mockRemoveCache(...args),
  hasCache: (...args) => mockHasCache(...args),
  getCache: (...args) => mockGetCache(...args),
  setCache: (...args) => mockSetCache(...args),
}));

jest.mock('../helpers/userHelper', () => () => ({
  notifyInfringements: (...args) => mockNotifyInfringements(...args),
}));

const PermissionService = require('./permissionService');

describe('PermissionService', () => {
  let mockUserProfile;
  let service;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUserProfile = { findById: jest.fn() };
    service = new PermissionService(mockUserProfile);
    mockNotifyInfringements.mockResolvedValue(undefined);
    mockLogUserPermissionChange.mockResolvedValue(undefined);
  });

  describe('validatePermissionsData', () => {
    it('should return true for valid permissions object', () => {
      expect(PermissionService.validatePermissionsData({ read: true })).toBe(true);
      expect(PermissionService.validatePermissionsData({})).toBe(true);
    });

    it('should return falsy for invalid permissions data', () => {
      expect(PermissionService.validatePermissionsData(null)).toBeFalsy();
      expect(PermissionService.validatePermissionsData(undefined)).toBeFalsy();
      expect(PermissionService.validatePermissionsData('string')).toBeFalsy();
    });
  });

  describe('checkUpdateAuthorization', () => {
    const mockRequestor = { requestorId: 'req123' };
    const targetUserId = 'user456';

    it('should return authorized true when user has permission', async () => {
      mockHasPermission.mockResolvedValue(true);
      mockCanRequestorUpdateUser.mockResolvedValue(true);

      const result = await PermissionService.checkUpdateAuthorization(mockRequestor, targetUserId);

      expect(result).toEqual({ authorized: true });
    });

    it('should return unauthorized when user lacks permission', async () => {
      mockHasPermission.mockResolvedValue(false);

      const result = await PermissionService.checkUpdateAuthorization(mockRequestor, targetUserId);

      expect(result.authorized).toBe(false);
    });

    it('should return unauthorized when cannot edit protected account', async () => {
      mockHasPermission.mockResolvedValue(true);
      mockCanRequestorUpdateUser.mockResolvedValue(false);

      const result = await PermissionService.checkUpdateAuthorization(mockRequestor, targetUserId);

      expect(result.authorized).toBe(false);
      expect(mockLogInfo).toHaveBeenCalled();
    });
  });

  describe('findUserById', () => {
    it('should return user when found', async () => {
      const mockUser = { _id: 'user123' };
      mockUserProfile.findById.mockResolvedValue(mockUser);

      const result = await service.findUserById('user123');

      expect(result).toEqual(mockUser);
    });

    it('should throw error when user not found', async () => {
      mockUserProfile.findById.mockResolvedValue(null);

      await expect(service.findUserById('nonexistent')).rejects.toThrow('User not found');
    });
  });

  describe('updateUserPermissions', () => {
    it('should update permissions with isAcknowledged false', () => {
      const mockUser = { permissions: {}, lastModifiedDate: null };

      PermissionService.updateUserPermissions(mockUser, { read: true });

      expect(mockUser.permissions.isAcknowledged).toBe(false);
      expect(mockUser.permissions.read).toBe(true);
    });
  });

  describe('updateUserCache', () => {
    it('should remove user-specific cache', () => {
      service.updateUserCache('user123');
      expect(mockRemoveCache).toHaveBeenCalledWith('user-user123');
    });

    it('should update allusers cache if present', () => {
      const allUserData = [{ _id: 'user123', name: 'John' }];
      mockHasCache.mockReturnValue(true);
      mockGetCache.mockReturnValue(JSON.stringify(allUserData));

      service.updateUserCache('user123');

      expect(mockSetCache).toHaveBeenCalled();
    });
  });

  describe('updatePermissions', () => {
    const userId = 'user123';
    const permissions = { read: true };
    const mockReq = { body: { requestor: { requestorId: 'req123' } } };

    beforeEach(() => {
      mockHasPermission.mockResolvedValue(true);
      mockCanRequestorUpdateUser.mockResolvedValue(true);
    });

    it('should throw error for invalid permissions data', async () => {
      await expect(service.updatePermissions(userId, null, mockReq)).rejects.toThrow(
        'Invalid permissions data',
      );
    });

    it('should throw 403 error when not authorized', async () => {
      mockHasPermission.mockResolvedValue(false);

      await expect(service.updatePermissions(userId, permissions, mockReq)).rejects.toThrow();
      try {
        await service.updatePermissions(userId, permissions, mockReq);
      } catch (error) {
        expect(error.statusCode).toBe(403);
      }
    });

    it('should update permissions successfully', async () => {
      const mockUser = {
        _id: userId,
        permissions: {},
        infringements: [],
        save: jest.fn().mockResolvedValue({
          infringements: [],
          firstName: 'John',
          lastName: 'Doe',
          email: 'test@test.com',
          role: 'Dev',
          startDate: new Date(),
          jobTitle: ['Engineer'],
          weeklycommittedHours: 40,
        }),
      };
      mockUserProfile.findById.mockResolvedValue(mockUser);

      const result = await service.updatePermissions(userId, permissions, mockReq);

      expect(result.message).toBe('Permissions updated successfully');
    });
  });
});
