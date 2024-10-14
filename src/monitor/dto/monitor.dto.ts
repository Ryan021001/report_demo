import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class MonitorDto {
  @ApiProperty({
    required: false,
    isArray: true,
    type: Array,
    example: ['invited', 'accepted'],
  })
  @IsOptional()
  keywords?: string[];
}

export default MonitorDto;
