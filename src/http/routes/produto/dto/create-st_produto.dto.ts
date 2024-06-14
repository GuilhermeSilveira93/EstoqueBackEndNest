import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
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
