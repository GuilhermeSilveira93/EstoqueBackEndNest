import { PrismaService } from '@/@prisma/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}
  async todosOsUsuarios() {}
}
