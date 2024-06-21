import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { CreateTipoDto } from './createtipo.dto';
export class UpdateTipoDto extends PartialType(CreateTipoDto) {
  @IsNotEmpty({ message: 'Ativo? é Obrigatório' })
  @IsBoolean()
  S_ATIVO?: boolean;
}
