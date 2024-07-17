import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

import { CreateGrupoDto } from './dto/create-grupo.dto';

@Injectable()
export class GrupoService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.sT_GRUPO.findMany({
      orderBy: [{ S_NOME: 'asc' }, { N_NIVEL: 'asc' }],
    });
  }
  async createGroup(req: CreateGrupoDto) {
    const { S_NOME, N_NIVEL } = req;

    return await this.prisma.sT_GRUPO.create({
      data: { S_NOME: S_NOME.toUpperCase(), N_NIVEL },
    });
  }
}
