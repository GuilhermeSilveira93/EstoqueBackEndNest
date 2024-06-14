import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

import { TypesProdutoDto } from './create-st_produto.dto';

export class UpdateStProdutoDto extends PartialType(TypesProdutoDto) {
  @IsNotEmpty({ message: 'ID é Obrigatório' })
  @IsNumber()
  ID_PRODUTO: number;

  @IsNotEmpty({ message: 'Ativo? é Obrigatório' })
  @IsBoolean()
  S_ATIVO?: boolean;
}
