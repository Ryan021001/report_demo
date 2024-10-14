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
      refresh_token:
        '1//04B2mAINJ2yG3CgYIARAAGAQSNwF-L9Irh0zICdsrDIpnT8N310y6_X4uf4hrbuXGre11-0IYJjS0KylFHpMkAmA0wWrpmCQKIUc',
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

  async checkEmailsAndNotify(keywords: string[] = ['on']): Promise<void> {
    const token =
      'ya29.a0AcM612x3Qe-m7SSL_Iki8N9sHdzqưeqweqwr3adadiWqưdqwdqwwhSZYcsCsyttUx1hvwSLnO_aZgDkaae901W-_lsRQS8rEQtoeOmWXXGf7z94U0n2MRQ8Ym_ADs9CfE45Ja4hQOqQtOiD1Wk9C6mKYEbgUxOhcPrc0Zm9V1MganOEbZaVEO971FO_uaCgYKAYoSARASFQHGX2MiAOxXffNxauC-hR_AGZtdkQ0175';
    await this.oauthClient.setCredentials({
      access_token: token,
    });

    try {
      await this.oauthClient.getTokenInfo(token);
    } catch (e) {
      if (e) {
        console.log('Access token expired or invalid, refreshing token...');
        const newAccessToken = await this.refreshAccessToken();
        this.oauthClient.setCredentials({
          access_token: newAccessToken,
        });
      }
    }
    // const userInfoClient = google.oauth2('v2').userinfo;
    const gmailClient = google.gmail({ version: 'v1', auth: this.oauthClient });

    const res = await gmailClient.users.messages.list({
      userId: 'me',
      maxResults: 10,
      q: 'is:unread',
    });
    const messages = res.data.messages || [];
    // Loop through the messages and get the full content of each email
    for (const message of messages) {
      const messageDetail = await gmailClient.users.messages.get({
        userId: 'me',
        id: message.id,
      });

      const payload = messageDetail.data.payload;
      if (payload.headers) {
        const subjectHeader = payload.headers.find(
          (header) => header.name === 'Subject',
        );
        if (
          keywords.some((keyword) => subjectHeader.value?.includes(keyword))
        ) {
          await this.discordService.sendNotification(
            `@everyone New email with subject: ${subjectHeader.value}`,
          );
          return;
        }
      }
    }
  }
}
