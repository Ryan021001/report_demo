import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TokenVerificationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  token: string;
}

export default TokenVerificationDto;
