import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, MaxLength } from 'class-validator';

import { CreateUserDTO } from './create-usuario.dto';
export class UpdateUserDTO extends PartialType(CreateUserDTO) {
  @IsBoolean()
  @MaxLength(1)
  S_ATIVO: boolean;
}
