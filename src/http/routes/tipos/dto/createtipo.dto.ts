import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreateTipoDto {
  @MaxLength(255)
  @IsString({ message: 'Nome precisa ser String' })
  @IsNotEmpty({ message: 'Nome obrigatório' })
  S_NOME: string;
}
