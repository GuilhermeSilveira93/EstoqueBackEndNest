import { IsOptional, IsString } from 'class-validator';

//PRECISAMOS COLOCAR OS CAMPOS PARA FAZER O DTO - DATA TRANSFER OBJECT
export class FindTipoDto {
  @IsString({ message: 'Filtro Ativo precisa ser String' })
  @IsOptional()
  S_ATIVO?: string;

  @IsString({ message: 'Filtro Nome precisa ser String' })
  @IsOptional()
  Search?: string;

  @IsString()
  @IsOptional()
  Page?: string;

  @IsString()
  @IsOptional()
  LimitPerPage?: string;
}
