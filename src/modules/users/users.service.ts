import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { email },
        data: updateUserDto,
      });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }

  async remove(email: string) {
    try {
      return await this.prisma.user.delete({ where: { email } });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }
}
