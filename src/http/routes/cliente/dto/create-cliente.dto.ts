import { IsNumber, IsString } from 'class-validator';
export class CreateClienteDto {
  @IsString({ message: 'Nome do Cliente é Obrigatório!' })
  S_NOME: string;

  @IsNumber()
  ID_EMPRESA: number;
}
