import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class UpdateBalanceDto {
  @IsDefined()
  @IsNumber()
  @ApiModelProperty()
  readonly amount: number;

  @IsDefined()
  @IsString()
  @ApiModelProperty()
  readonly date: number;
}
