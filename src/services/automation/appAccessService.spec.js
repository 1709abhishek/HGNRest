const mockFindOne = jest.fn();
const mockSave = jest.fn();

jest.mock('../../models/applicationAccess', () => {
  const MockModel = function (data) {
    return { ...data, save: mockSave };
  };
  MockModel.findOne = (...args) => mockFindOne(...args);
  return MockModel;
});

const {
  upsertAppAccess,
  revokeAppAccess,
  getAppCredentials,
  getAppAccess,
} = require('./appAccessService');

describe('appAccessService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSave.mockResolvedValue({});
  });

  describe('upsertAppAccess', () => {
    it('should create new app access when none exists', async () => {
      mockFindOne.mockResolvedValue(null);

      await upsertAppAccess('user123', 'GitHub', 'active', { token: 'abc' });

      expect(mockFindOne).toHaveBeenCalledWith({ userId: 'user123' });
      expect(mockSave).toHaveBeenCalled();
    });

    it('should update existing app', async () => {
      const existingAccess = {
        userId: 'user123',
        apps: [{ app: 'GitHub', status: 'inactive' }],
        save: mockSave,
      };
      mockFindOne.mockResolvedValue(existingAccess);

      await upsertAppAccess('user123', 'GitHub', 'active', { token: 'new' });

      expect(existingAccess.apps[0].status).toBe('active');
      expect(mockSave).toHaveBeenCalled();
    });

    it('should add new app when different app exists', async () => {
      const existingAccess = {
        userId: 'user123',
        apps: [{ app: 'Slack', status: 'active' }],
        save: mockSave,
      };
      mockFindOne.mockResolvedValue(existingAccess);

      await upsertAppAccess('user123', 'GitHub', 'active', { token: 'abc' });

      expect(existingAccess.apps).toHaveLength(2);
    });
  });

  describe('revokeAppAccess', () => {
    it('should revoke app access', async () => {
      const appAccess = {
        userId: 'user123',
        apps: [{ app: 'GitHub', status: 'active', credentials: { token: 'abc' } }],
        save: mockSave,
      };
      mockFindOne.mockResolvedValue(appAccess);

      await revokeAppAccess('user123', 'GitHub');

      expect(appAccess.apps[0].status).toBe('revoked');
    });

    it('should throw error when no record found', async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(revokeAppAccess('user123', 'GitHub')).rejects.toThrow(
        'No application access record found',
      );
    });

    it('should throw error when app not found', async () => {
      mockFindOne.mockResolvedValue({ apps: [{ app: 'Slack' }] });

      await expect(revokeAppAccess('user123', 'GitHub')).rejects.toThrow(
        'GitHub folder information not found',
      );
    });
  });

  describe('getAppCredentials', () => {
    it('should return credentials when found', async () => {
      const mockCreds = { token: 'abc123' };
      mockFindOne.mockResolvedValue({
        apps: [{ app: 'GitHub', credentials: mockCreds }],
      });

      const result = await getAppCredentials('user123', 'GitHub');

      expect(result).toEqual(mockCreds);
    });

    it('should throw error when not found', async () => {
      mockFindOne.mockResolvedValue(null);

      await expect(getAppCredentials('user123', 'GitHub')).rejects.toThrow(
        'GitHub credentials not found',
      );
    });
  });

  describe('getAppAccess', () => {
    it('should return app access details', async () => {
      const mockApp = {
        app: 'GitHub',
        status: 'active',
        credentials: { token: 'abc' },
        invitedOn: new Date(),
        revokedOn: null,
        failedReason: null,
      };
      mockFindOne.mockResolvedValue({ apps: [mockApp] });

      const result = await getAppAccess('user123', 'GitHub');

      expect(result.status).toBe('active');
    });

    it('should throw error when app not found', async () => {
      mockFindOne.mockResolvedValue({ apps: [] });

      await expect(getAppAccess('user123', 'GitHub')).rejects.toThrow('GitHub access not found');
    });
  });
});
