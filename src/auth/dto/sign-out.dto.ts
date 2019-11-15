import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class SignOutDto {
  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly accountNumber: string;
}
