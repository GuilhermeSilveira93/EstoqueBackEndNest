import { PartialType } from '@nestjs/mapped-types';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

import { CreateProdutoDto } from './create-st_produto.dto';

export class UpdateStProdutoDto extends PartialType(CreateProdutoDto) {
  @IsNotEmpty({ message: 'ID é Obrigatório' })
  @IsNumber()
  ID_PRODUTO: number;

  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @IsString()
  @Length(1, 150)
  S_NOME?: string;

  @IsNotEmpty({ message: 'Ativo? é Obrigatório' })
  @IsBoolean()
  S_ATIVO?: boolean;
}
