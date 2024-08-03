import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  length,
  Length,
  ValidateNested,
} from 'class-validator';

export class D_DATA{
  @IsDate()
  D_INICIO: Date

  @IsDate()
  D_FIM: Date
}

export class RelatorioEntradaDto {
  @ValidateNested()
  @Type(()=> D_DATA)
  D_DATA: D_DATA

  @IsOptional()
  @IsString()
  @Length(36,36, {message: 'ID_PRODUTO É INVALIDO!'})
  ID_PRODUTO: string;

  @IsOptional()
  @IsString()
  @Length(36,36, {message: 'ID_FORNECEDOR É INVALIDO!'})
  ID_FORNECEDOR: string;

}