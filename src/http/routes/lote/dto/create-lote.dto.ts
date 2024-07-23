import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TypesStProdutoLoteDto {
  @IsString()
  @IsNotEmpty({ message: 'Produto não pode ser vazio' })
  ID_PRODUTO: string;

  @IsString()
  @IsOptional()
  S_DIMENSAO?: string;

  @IsString()
  @IsOptional()
  S_DETALHES?: string;

  @IsNumber()
  @IsOptional()
  N_VALOR?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'Valor não pode ser vazio' })
  N_QUANTIDADE: number;
}
export class CreateLoteDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: false })
  @Type(() => TypesStProdutoLoteDto)
  DADOS: TypesStProdutoLoteDto[];
}
