import { IsNumber, IsOptional, IsString } from 'class-validator';

//PRECISAMOS COLOCAR OS CAMPOS PARA FAZER O DTO - DATA TRANSFER OBJECT
export class FindClienteDto {
  @IsString()
  @IsOptional()
  ID_CLIENTE?: string;

  @IsString()
  @IsOptional()
  ID_EMPRESA?: string;

  @IsString({ message: 'Filtro Ativo precisa ser String' })
  @IsOptional()
  S_ATIVO?: string;

  @IsString({ message: 'Filtro Nome precisa ser String' })
  @IsOptional()
  Search?: string;

  @IsNumber()
  @IsOptional()
  Page?: string;

  @IsNumber()
  @IsOptional()
  LimitPerPage?: string;
}
