import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsDefined()
  @ApiModelProperty()
  readonly accountNumber: string;

  @IsDefined()
  @IsNumber()
  @ApiModelProperty()
  readonly pin: number;
}
