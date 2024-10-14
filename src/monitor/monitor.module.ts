import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { MonitorController } from './monitor.controller';
import { GmailModule } from '../gmail/gmail.module';

@Module({
  imports: [GmailModule],
  providers: [MonitorService],
  controllers: [MonitorController],
})
export class MonitorModule {}
