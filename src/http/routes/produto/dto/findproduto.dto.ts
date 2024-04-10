import { IsOptional, IsString } from 'class-validator';

//PRECISAMOS COLOCAR OS CAMPOS PARA FAZER O DTO - DATA TRANSFER OBJECT
export class FindProdutoDto {
  @IsString({ message: 'ID do produto precisa ser String' })
  @IsOptional()
  ID_PRODUTO?: string;

  @IsString({ message: 'Filtro Ativo precisa ser String' })
  @IsOptional()
  S_ATIVO?: string;
}
