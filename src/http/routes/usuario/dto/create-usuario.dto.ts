import {
  IsString,
  Length,
  MaxLength,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: 'Usuário não pode ser vazio' })
  S_NOME: string;

  @IsString()
  @Length(1, 150, { message: 'S_EMAIL deve ter no máximo 150 caracteres' })
  S_EMAIL: string;

  @IsOptional()
  @IsString()
  @MaxLength(150, { message: 'Senha deve ter no máximo 150 caracteres' })
  S_SENHA: string;

  @IsString()
  ID_GRUPO: string;
}
