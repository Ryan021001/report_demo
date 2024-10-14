import { Injectable } from '@nestjs/common';
import { GmailService } from '../gmail/gmail.service';
import MonitorDto from './dto/monitor.dto';
import { config } from 'dotenv';
import { Cron, CronExpression } from '@nestjs/schedule';

config();
@Injectable()
export class MonitorService {
  constructor(private readonly gmailService: GmailService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async checkEmailsAndNotify(monitorData: MonitorDto): Promise<void> {
    // await this.gmailService.readUnreadEmails(monitorData?.keywords);
    await this.gmailService.checkEmailsAndNotify(monitorData?.keywords);
  }
}
