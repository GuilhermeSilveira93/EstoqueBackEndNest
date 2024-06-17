import { IsString } from 'class-validator';

export class CreateFornecedorDto {
  @IsString({ message: 'Nome do fornecedor é Obrigatório!' })
  S_NOME: string;
}
