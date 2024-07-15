import { IsString } from 'class-validator';
export class CreateClienteDto {
  @IsString({ message: 'Nome do Cliente é Obrigatório!' })
  S_NOME: string;

  @IsString()
  ID_EMPRESA: string;
}
