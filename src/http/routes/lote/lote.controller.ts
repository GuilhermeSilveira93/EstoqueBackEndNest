import { Controller, Post, Body, Req, Res, Get } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateLoteDto } from './dto/create-lote.dto';
import { LoteService } from './lote.service';
import { RelatorioEntradaDto } from './dto/relatorio-entrada.dto';
import { RelatorioSaidaDto } from './dto/relatorio-saida.dto';

@Controller('lote')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post(':ID_FORNECEDOR')
  async createEntrada(
    @Body() createLoteDto: CreateLoteDto,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const { ID_FORNECEDOR } = req.params as { ID_FORNECEDOR?: string };
    try {
      await this.loteService.createEntrada({ data: createLoteDto, ID_FORNECEDOR });
      res.send({ message: 'Entrada de Produtos realizada com sucesso!' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post('/saida/:ID_CLIENTE')
  async createSaida(
    @Body() createLoteDto: CreateLoteDto,
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ) {
    const { ID_CLIENTE } = req.params as { ID_CLIENTE: string };
    try {
      await this.loteService.createSaida({ data: createLoteDto, ID_CLIENTE });
      res.send({ message: 'Saida de Produtos realizada com sucesso!' });
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post('/relatorio/entrada')
  async relatorioEntrada(@Req() req: FastifyRequest,@Res() res: FastifyReply) {
    const data = req.body as RelatorioEntradaDto
    try {
      const consulta = await this.loteService.relatorioEntrada( {data} );
      res.status(200).send(consulta);
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
  @Post('/relatorio/saida')
  async relatorioSaida(@Req() req: FastifyRequest,@Res() res: FastifyReply) {
    const data = req.body as RelatorioSaidaDto
    try {
      const consulta = await this.loteService.relatorioSaida( {data} );
      res.status(200).send(consulta);
    } catch (err) {
      const _error = err as { message: string };

      return res.status(409).send({
        message: _error.message,
      });
    }
  }
}
