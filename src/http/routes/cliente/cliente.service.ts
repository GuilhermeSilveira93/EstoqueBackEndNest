import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { FindClienteDto } from './dto/findCliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(readonly prisma: PrismaService) {}
  async findAll(req: FindClienteDto) {
    const {
      ID_CLIENTE,
      ID_EMPRESA,
      Search,
      Page = '0',
      LimitPerPage = '10',
      S_ATIVO = 'S',
    } = req;
    const calculoSkip = Number(LimitPerPage) * (Number(Page) - 1);
    const skip = calculoSkip < 0 ? 0 : calculoSkip;

    const total = await this.prisma.st_cliente.count({
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_CLIENTE: ID_CLIENTE ? Number(ID_CLIENTE) : undefined,
        ID_EMPRESA: ID_EMPRESA ? Number(ID_EMPRESA) : undefined,
      },
    });

    const clientes = await this.prisma.st_cliente.findMany({
      select: {
        ID_CLIENTE: true,
        S_NOME: true,
        S_ATIVO: true,
        ID_EMPRESA: true,
        ST_EMPRESA: {
          select: {
            S_NOME: true,
          },
        },
      },
      where: {
        S_ATIVO,
        S_NOME: { contains: Search },
        ID_CLIENTE: ID_CLIENTE ? Number(ID_CLIENTE) : undefined,
        ID_EMPRESA: ID_EMPRESA ? Number(ID_EMPRESA) : undefined,
      },
      take: Number(LimitPerPage),
      skip,
      orderBy: [{ ST_EMPRESA: { S_NOME: 'asc' } }, { S_NOME: 'asc' }],
    });

    const consulta = clientes.map((cliente) => {
      return {
        ID_CLIENTE: cliente.ID_CLIENTE,
        data: {
          S_NOME: cliente.S_NOME,
          S_ATIVO: cliente.S_ATIVO,
          S_EMPRESA: cliente.ST_EMPRESA.S_NOME,
        },
      };
    });

    return { total, data: consulta };
  }
  async attCliente({
    ID_CLIENTE,
    data,
  }: {
    ID_CLIENTE: number;
    data: UpdateClienteDto;
  }) {
    try {
      await this.prisma.st_cliente.update({
        data: {
          S_ATIVO: data.S_ATIVO ? 'S' : 'N',
          S_NOME: data.S_NOME,
        },
        where: {
          ID_CLIENTE,
        },
      });
    } catch (error) {}
  }
}
