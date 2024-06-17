import { IsString } from 'class-validator';

export class CreateEmpresaDto {
  @IsString({ message: 'Nome para empresa é Obrigatório!' })
  S_NOME: string;
}
