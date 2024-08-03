import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { D_DATA } from './relatorio-entrada.dto';



export class RelatorioSaidaDto extends PartialType(D_DATA) {
  @ValidateNested()
  @Type(()=> D_DATA)
  D_DATA: D_DATA

  @IsOptional()
  @IsString()
  @Length(36,36, {message: 'ID_PRODUTO É INVALIDO!'})
  ID_PRODUTO: string;

  @IsOptional()
  @IsString()
  @Length(36,36, {message: 'ID_CLIENTE É INVALIDO!'})
  ID_CLIENTE: string;

  @IsOptional()
  @IsString()
  @Length(36,36, {message: 'ID_EMPRESA É INVALIDO!'})
  ID_EMPRESA: string;


}