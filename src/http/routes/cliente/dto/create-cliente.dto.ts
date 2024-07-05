import { IsString } from 'class-validator';
export class CreateClienteDto {
  @IsString({ message: 'Nome para empresa é Obrigatório!' })
  S_NOME: string;
}
