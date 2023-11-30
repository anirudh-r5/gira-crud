import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({ data: createProjectDto });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findOne(id: number) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { users: true, issues: true },
    });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.project.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }
}
