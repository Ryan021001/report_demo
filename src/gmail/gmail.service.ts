import { Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { config } from 'dotenv';
import * as imaps from 'imap-simple';
import { DiscordService } from '../discord/discord.service';
import { gmailConfig, googleConfig } from '../configs/configs.constants';

config();
@Injectable()
export class GmailService {
  // Changed class name to GmailService
  oauthClient: Auth.OAuth2Client;
  constructor(private readonly discordService: DiscordService) {
    this.oauthClient = new google.auth.OAuth2(
      googleConfig.clientId,
      googleConfig.clientSecret,
    );
  }

  private config = {
    imap: {
      user: gmailConfig.user,
      password: gmailConfig.password,
      host: gmailConfig.host,
      port: gmailConfig.port,
      tls: gmailConfig.tls,
      authTimeout: gmailConfig.authTimeout,
      tlsOptions: { rejectUnauthorized: false },
    },
  };

  async readUnreadEmails(keywords: string[]): Promise<void> {
    try {
      const connection = await imaps.connect({ imap: this.config.imap });

      await connection.openBox('INBOX');

      const fetchOptions = {
        bodies: ['HEADER.FIELDS (SUBJECT)'],
        markSeen: false,
      };

      const searchCriteria = ['UNSEEN'];
      const messages = await connection.search(searchCriteria, fetchOptions);

      for (const message of messages) {
        const subjectHeader = message.parts[0].body.subject[0];

        if (
          subjectHeader &&
          keywords.some((keyword) => subjectHeader.includes(keyword))
        ) {
          console.log('Sending notification');
          await this.discordService.sendNotification(
            `@everyone New email with subject: ${subjectHeader}`,
          );
          return;
        }
      }
      connection.end();
    } catch (err) {
      throw err;
    }
  }

  async refreshAccessToken() {
    await this.oauthClient.setCredentials({
      refresh_token: googleConfig.refreshToken,
    });
    try {
      const tokenResponse = await this.oauthClient.refreshAccessToken();
      const newCredentials = tokenResponse.credentials;
      if (newCredentials.access_token) {
        return newCredentials.access_token;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async checkEmailConnection() {
    try {
      const accessToken = await this.refreshAccessToken();

      if (accessToken) {
        await this.discordService.sendNotification(
          '@everyone ✅ Gmail system check at 12:00: The system is connected and working properly.',
        );
      } else {
        await this.discordService.sendNotification(
          '@everyone ⚠️ Gmail system check at 12:00: Unable to connect to Gmail.',
        );
      }
    } catch (error) {
      await this.discordService.sendNotification(
        `@everyone ❌ Gmail system check at 12:00: Error connecting to Gmail - ${error.message}`,
      );
    }
  }

  private async authenticate() {
    try {
      const token = googleConfig.accessToken;
      await this.oauthClient.getTokenInfo(token);
      await this.oauthClient.setCredentials({
        access_token: token,
      });
    } catch {
      console.log('Access token expired or invalid, refreshing token...');
      const newAccessToken = await this.refreshAccessToken();
      this.oauthClient.setCredentials({
        access_token: newAccessToken,
      });
    }
  }

  private async getUnreadEmails(gmailClient: any, keywords: string[]) {
    const query = `is:unread ${keywords.map((keyword) => `subject:"${keyword}"`).join(' OR ')}`;
    const res = await gmailClient.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: query,
    });

    return res.data.messages || [];
  }

  private async checkEmailContent(
    gmailClient: any,
    messageId: string,
    keywords: string[],
  ): Promise<boolean | string> {
    const messageDetail = await gmailClient.users.messages.get({
      userId: 'me',
      id: messageId,
    });

    const payload = messageDetail.data.payload;
    if (payload.headers) {
      const subjectHeader = payload.headers.find(
        (header) => header.name === 'Subject',
      );
      const bodyPart = payload.parts?.find(
        (part) => part.mimeType === 'text/plain',
      )?.body?.data;
      const body = bodyPart ? Buffer.from(bodyPart, 'base64').toString() : null;

      // Check if subject contains any of the keywords and if the body includes the specific text
      if (
        subjectHeader &&
        keywords.some((keyword) => subjectHeader.value.includes(keyword)) &&
        body?.includes('com.app.test.limit')
      ) {
        console.log('Sending notification');
        return subjectHeader.value;
      }
    }
    return false;
  }

  private async sendMultipleNotifications(subject: string) {
    for (let i = 0; i < 3; i++) {
      await this.discordService.sendNotification(
        `@everyone Email subject: ${subject} error`,
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  async checkEmailsAndNotify(
    keywords: string[] = ['admob test limit'],
  ): Promise<void> {
    // Authenticate OAuth credentials
    await this.authenticate();

    // Initialize Gmail client
    const gmailClient = google.gmail({ version: 'v1', auth: this.oauthClient });

    // Fetch the list of unread emails
    const messages = await this.getUnreadEmails(gmailClient, keywords);

    // Loop through each email and check for matching keywords
    for (const message of messages) {
      const content = await this.checkEmailContent(
        gmailClient,
        message.id,
        keywords,
      );

      // If a matching email is found, send notifications to Discord
      if (content) {
        // Send 3 notifications with a 5-second delay between each
        await this.sendMultipleNotifications(content as string);
        return;
      }
    }
  }
}
