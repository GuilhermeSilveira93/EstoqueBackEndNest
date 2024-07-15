import { IsNumber, IsString } from 'class-validator';
export class CreateGrupoDto {
  @IsString({ message: 'Nome do grupo é Obrigatório!' })
  S_NOME: string;

  @IsNumber()
  N_NIVEL: number;
}
