import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class BodyDto {
  @IsNotEmpty({ message: 'Email é Obrigatório.' })
  @IsEmail()
  @Length(1, 150, { message: 'Tamanho deve ser entre 1 e 150 caracteres.' })
  S_EMAIL: string;

  @IsNotEmpty({ message: 'Digite uma senha.' })
  @IsString()
  @Length(1, 64, { message: 'Tamanho deve ser entre 1 e 64 caracteres.' })
  S_SENHA: string;
}
export class LoginDto {
  @Type(() => BodyDto)
  body: BodyDto;
}
