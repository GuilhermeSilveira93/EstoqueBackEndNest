import { Type } from 'class-transformer';
import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
export class TypesStProdutoDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty({ message: 'Nome obrigatório' })
  S_NOME: string;

  @IsString()
  @IsOptional()
  @MaxLength(45)
  N_SERIAL?: string;

  @IsString()
  @IsNotEmpty({ message: 'Tipo obrigatório' })
  ID_TIPO: string;
}
export class CreateStProdutoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TypesStProdutoDto)
  DADOS: TypesStProdutoDto[];
}
