import { MaxLength, IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class GetAllUserDto {
  @IsString()
  @IsNotEmpty({ message: 'ID do usuário é obrigatório' })
  ID_USUARIO: string;

  @IsString()
  @IsOptional()
  S_ATIVO: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'Search deve ter no máximo 50 caracteres' })
  Search: string;

  @IsString()
  @IsOptional()
  Page: string;

  @IsString()
  @IsOptional()
  LimitPerPage: string;
}
