import {
  IsString,
  IsBoolean,
  Length,
  IsNumber,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Usuário não pode ser vazio' })
  S_NOME: string;

  @IsBoolean()
  @MaxLength(1)
  S_ATIVO: boolean;

  @IsString()
  @Length(1, 150, { message: 'S_EMAIL deve ter no máximo 150 caracteres' })
  S_EMAIL: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Senha deve ter no máximo 150 caracteres' })
  S_SENHA: string;

  @IsNumber()
  ID_GRUPO: number;
}
