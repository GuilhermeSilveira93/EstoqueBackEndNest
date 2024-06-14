import { Type } from 'class-transformer';
import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsArray,
  IsNumber,
} from 'class-validator';
export class TypesProdutoDto {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty({ message: 'Nome obrigatório' })
  S_NOME: string;

  @IsString()
  @IsOptional()
  @MaxLength(45)
  N_SERIAL?: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Tipo obrigatório' })
  ID_TIPO: number;
}
export class CreateProdutoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TypesProdutoDto)
  DADOS: TypesProdutoDto[];
}
