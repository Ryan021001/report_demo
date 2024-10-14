import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { GmailModule } from './gmail/gmail.module';
import { DiscordModule } from './discord/discord.module';
import { MonitorModule } from './monitor/monitor.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GmailModule,
    DiscordModule,
    MonitorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
