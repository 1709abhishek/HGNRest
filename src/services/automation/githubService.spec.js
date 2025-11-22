const mockAxios = jest.fn();

jest.mock(
  'axios',
  () =>
    (...args) =>
      mockAxios(...args),
);

const { checkUserMembership, getTeams, addUserToTeam, removeUser } = require('./githubService');

describe('githubService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.GITHUB_TOKEN = 'test-token';
    process.env.GITHUB_ORG_NAME = 'test-org';
  });

  describe('checkUserMembership', () => {
    it('should return membership details when user is a member', async () => {
      mockAxios.mockResolvedValue({ data: { state: 'active', role: 'member' } });

      const result = await checkUserMembership('testuser');

      expect(result).toEqual({ exists: true, state: 'active', role: 'member' });
    });

    it('should return exists false for 404', async () => {
      mockAxios.mockRejectedValue({ response: { status: 404 } });

      const result = await checkUserMembership('testuser');

      expect(result).toEqual({ exists: false, state: null, role: null });
    });

    it('should throw ForbiddenError on 403', async () => {
      mockAxios.mockRejectedValue({ response: { status: 403 } });

      await expect(checkUserMembership('testuser')).rejects.toThrow();
      try {
        await checkUserMembership('testuser');
      } catch (error) {
        expect(error.name).toBe('ForbiddenError');
        expect(error.statusCode).toBe(403);
      }
    });
  });

  describe('getTeams', () => {
    it('should return filtered teams', async () => {
      const mockTeams = [
        {
          id: 1,
          name: 'HGN',
          slug: 'highest-good-network-team',
          description: '',
          privacy: 'closed',
        },
        { id: 2, name: 'Other', slug: 'other-team', description: '', privacy: 'closed' },
      ];
      mockAxios.mockResolvedValue({ data: mockTeams });

      const result = await getTeams();

      expect(result).toHaveLength(1);
      expect(result[0].slug).toBe('highest-good-network-team');
    });
  });

  describe('addUserToTeam', () => {
    it('should add user to team successfully', async () => {
      mockAxios.mockResolvedValue({ status: 200 });

      const result = await addUserToTeam('testuser', 'test-team');

      expect(result).toContain('testuser');
      expect(result).toContain('test-team');
    });

    it('should throw NotFoundError on 404', async () => {
      mockAxios.mockRejectedValue({ response: { status: 404 } });

      await expect(addUserToTeam('testuser', 'nonexistent')).rejects.toThrow();
      try {
        await addUserToTeam('testuser', 'nonexistent');
      } catch (error) {
        expect(error.name).toBe('NotFoundError');
      }
    });
  });

  describe('removeUser', () => {
    it('should remove user successfully', async () => {
      mockAxios.mockResolvedValue({ status: 204 });

      const result = await removeUser('testuser');

      expect(result).toContain('successfully removed');
    });

    it('should throw NotFoundError on 404', async () => {
      mockAxios.mockRejectedValue({ response: { status: 404 } });

      await expect(removeUser('testuser')).rejects.toThrow();
      try {
        await removeUser('testuser');
      } catch (error) {
        expect(error.name).toBe('NotFoundError');
      }
    });
  });
});
