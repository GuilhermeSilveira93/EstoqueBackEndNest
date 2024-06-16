import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

import { CreateProdutoDTO } from './create-st_produto.dto';

export class UpdateStProdutoDto extends PartialType(CreateProdutoDTO) {
  @IsNotEmpty({ message: 'ID é Obrigatório' })
  @IsNumber()
  ID_PRODUTO: number;

  @IsNotEmpty({ message: 'Ativo? é Obrigatório' })
  @IsBoolean()
  S_ATIVO?: boolean;
}
