import {
  MaxLength,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
} from 'class-validator';
export class CreateProdutoDTO {
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
