const mockEmailSender = jest.fn();

jest.mock(
  '../../utilities/emailSender',
  () =>
    (...args) =>
      mockEmailSender(...args),
);

const { sendSlackInvite } = require('./slackService');

describe('slackService', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
    process.env.SLACK_WORKSPACE_URL = 'https://test-workspace.slack.com/join';
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('sendSlackInvite', () => {
    it('should send Slack invite email successfully', async () => {
      mockEmailSender.mockResolvedValue(undefined);

      await sendSlackInvite('test@example.com');

      expect(mockEmailSender).toHaveBeenCalledWith(
        ['test@example.com'],
        "You're Invited to Join Our Slack Workspace!",
        expect.stringContaining('https://test-workspace.slack.com/join'),
      );
    });

    it('should throw error when recipientEmail is not provided', async () => {
      await expect(sendSlackInvite()).rejects.toThrow(
        'Recipient email is required and must be a string',
      );
      await expect(sendSlackInvite(null)).rejects.toThrow(
        'Recipient email is required and must be a string',
      );
      await expect(sendSlackInvite('')).rejects.toThrow(
        'Recipient email is required and must be a string',
      );
    });

    it('should throw error when SLACK_WORKSPACE_URL is not set', async () => {
      delete process.env.SLACK_WORKSPACE_URL;
      await expect(sendSlackInvite('test@example.com')).rejects.toThrow(
        'Slack workspace URL is not set in the environment variables',
      );
    });

    it('should throw error when emailSender fails', async () => {
      mockEmailSender.mockRejectedValue(new Error('SMTP connection failed'));
      await expect(sendSlackInvite('test@example.com')).rejects.toThrow(
        'Slack: Error sending invite email',
      );
    });
  });
});
