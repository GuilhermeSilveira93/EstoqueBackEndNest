import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean } from 'class-validator';

import { CreateFornecedorDto } from './create-fornecedor.dto';

export class UpdateFornecedorDto extends PartialType(CreateFornecedorDto) {
  @IsBoolean()
  S_ATIVO: boolean;
}
