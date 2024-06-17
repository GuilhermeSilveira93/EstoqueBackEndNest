import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, MaxLength } from 'class-validator';

import { CreateEmpresaDto } from './create-empresa.dto';

export class UpdateEmpresaDto extends PartialType(CreateEmpresaDto) {
  @IsBoolean()
  @MaxLength(1)
  S_ATIVO: boolean;
}
