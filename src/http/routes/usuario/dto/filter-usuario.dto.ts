import { MaxLength, IsString, IsOptional } from 'class-validator';

export class FilterUserDto {
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
