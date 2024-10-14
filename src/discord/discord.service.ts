import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { discordConfig } from '../configs/configs.constants';

@Injectable()
export class DiscordService {
  private discordWebhookUrl: string;

  constructor(private readonly httpService: HttpService) {
    this.discordWebhookUrl = discordConfig.webhookUrl;
  }

  async sendNotification(message: string): Promise<void> {
    await this.httpService
      .post(this.discordWebhookUrl, {
        content: message,
      })
      .toPromise();
  }
}
