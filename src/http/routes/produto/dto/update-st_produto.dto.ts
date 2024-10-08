import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { CreateProdutoDTO } from './create-st_produto.dto';

export class UpdateStProdutoDto extends PartialType(CreateProdutoDTO) {
  @IsNotEmpty({ message: 'Ativo? é Obrigatório' })
  @IsBoolean()
  S_ATIVO?: boolean;
}
