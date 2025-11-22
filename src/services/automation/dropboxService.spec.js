const mockFilesGetMetadata = jest.fn();
const mockFilesCreateFolderV2 = jest.fn();
const mockFilesDeleteV2 = jest.fn();
const mockFilesListFolder = jest.fn();

jest.mock('dropbox', () => ({
  Dropbox: jest.fn().mockImplementation(() => ({
    filesGetMetadata: (...args) => mockFilesGetMetadata(...args),
    filesCreateFolderV2: (...args) => mockFilesCreateFolderV2(...args),
    filesDeleteV2: (...args) => mockFilesDeleteV2(...args),
    filesListFolder: (...args) => mockFilesListFolder(...args),
    sharingShareFolder: jest.fn(),
    sharingCheckShareJobStatus: jest.fn(),
    sharingAddFolderMember: jest.fn(),
    sharingListFolderMembers: jest.fn(),
  })),
}));

const { getTeamFolderPath, getAvailableTeamFolders, deleteFolder } = require('./dropboxService');

describe('dropboxService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getTeamFolderPath', () => {
    it('should return HGN team folder path by default', () => {
      const result = getTeamFolderPath();
      expect(result).toBe('/_Highest Good Network Team');
    });

    it('should return HGN team folder path for HGN key', () => {
      const result = getTeamFolderPath('HGN');
      expect(result).toBe('/_Highest Good Network Team');
    });

    it('should return ADMIN team folder path', () => {
      const result = getTeamFolderPath('ADMIN');
      expect(result).toBe('/_Administration Team');
    });

    it('should throw ValidationError for empty key', () => {
      expect(() => getTeamFolderPath('')).toThrow();
      try {
        getTeamFolderPath('');
      } catch (error) {
        expect(error.name).toBe('ValidationError');
        expect(error.statusCode).toBe(400);
      }
    });

    it('should throw NotFoundError for invalid key', () => {
      expect(() => getTeamFolderPath('INVALID')).toThrow();
      try {
        getTeamFolderPath('INVALID');
      } catch (error) {
        expect(error.name).toBe('NotFoundError');
        expect(error.statusCode).toBe(404);
      }
    });
  });

  describe('getAvailableTeamFolders', () => {
    it('should return list of available team folders', () => {
      const result = getAvailableTeamFolders();

      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);

      const hgnFolder = result.find((f) => f.key === 'HGN');
      expect(hgnFolder).toBeDefined();
      expect(hgnFolder.isDefault).toBe(true);
    });

    it('should remove leading underscore from folder names', () => {
      const result = getAvailableTeamFolders();

      result.forEach((folder) => {
        expect(folder.name).not.toMatch(/^_/);
      });
    });
  });

  describe('deleteFolder', () => {
    it('should throw ValidationError for empty folder ID', async () => {
      await expect(deleteFolder('')).rejects.toThrow();
      try {
        await deleteFolder('');
      } catch (error) {
        expect(error.name).toBe('ValidationError');
        expect(error.statusCode).toBe(400);
      }
    });

    it('should delete folder successfully', async () => {
      mockFilesDeleteV2.mockResolvedValue({});

      const result = await deleteFolder('id:folder123');

      expect(result.success).toBe(true);
      expect(result.method).toBe('folder_id');
    });

    it('should throw NotFoundError when folder not found', async () => {
      mockFilesDeleteV2.mockRejectedValue({
        status: 409,
        error: { error: { '.tag': 'path_lookup' } },
      });

      await expect(deleteFolder('id:nonexistent')).rejects.toThrow();
      try {
        await deleteFolder('id:nonexistent');
      } catch (error) {
        expect(error.name).toBe('NotFoundError');
        expect(error.statusCode).toBe(404);
      }
    });

    it('should throw ForbiddenError on 403', async () => {
      mockFilesDeleteV2.mockRejectedValue({ status: 403 });

      await expect(deleteFolder('id:folder123')).rejects.toThrow();
      try {
        await deleteFolder('id:folder123');
      } catch (error) {
        expect(error.name).toBe('ForbiddenError');
        expect(error.statusCode).toBe(403);
      }
    });
  });
});
