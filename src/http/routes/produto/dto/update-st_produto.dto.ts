import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import { CreateStProdutoDto } from './create-st_produto.dto';

export class UpdateStProdutoDto extends PartialType(CreateStProdutoDto) {
  @IsNotEmpty({ message: 'ID é Obrigatório' })
  @IsNumber()
  ID_PRODUTO: number;

  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @IsString()
  @Length(1, 150)
  S_NOME?: string;

  @IsNotEmpty({ message: 'Nome é Obrigatório' })
  @IsString()
  @MaxLength(1)
  S_ATIVO?: string;
}
