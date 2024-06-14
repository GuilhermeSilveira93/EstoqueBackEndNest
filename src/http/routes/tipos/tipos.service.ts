import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TiposService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    const consulta = await this.prisma.st_tipo.findMany();

    return { data: consulta };
  }
}
