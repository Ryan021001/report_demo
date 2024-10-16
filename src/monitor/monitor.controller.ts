import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import MonitorDto from './dto/monitor.dto';

@Controller('monitor')
@ApiTags('monitor')
export class MonitorController {
  constructor(private readonly monitorService: MonitorService) {}

  @ApiOperation({
    summary: 'test',
  })
  @Post('/notify')
  async checkEmailsAndNotify(@Body() tokenData: MonitorDto) {
    await this.monitorService.checkEmailsAndNotify(tokenData);
    await this.monitorService.checkEmailConnection();
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
