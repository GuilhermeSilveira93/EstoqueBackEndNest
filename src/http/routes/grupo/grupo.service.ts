import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GrupoService {
  constructor(private prisma: PrismaService) {}
  async findAll() {
    return await this.prisma.st_grupo.findMany();
  }
}
