import { ApiModelProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class RegisterDto {
  @IsDefined()
  @IsString()
  @ApiModelProperty()
  readonly firstname: string;

  @IsDefined()
  @IsString()
  @ApiModelProperty()
  readonly lastname: string;

  @IsDefined()
  @IsString()
  @ApiModelProperty()
  readonly genre: string;

  @IsDefined()
  @IsString()
  @ApiModelProperty()
  readonly birthdate: string;

  @IsDefined()
  @IsString()
  @ApiModelProperty()
  readonly address: string;
}
