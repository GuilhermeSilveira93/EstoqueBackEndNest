import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, MaxLength } from 'class-validator';

import { CreateClienteDto } from './create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsBoolean()
  @MaxLength(1)
  S_ATIVO: boolean;
}
