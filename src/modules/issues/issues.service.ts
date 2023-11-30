import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IssuesService {
  constructor(private prisma: PrismaService) {}
  create(createIssueDto: CreateIssueDto) {
    return this.prisma.issue.create({ data: createIssueDto });
  }

  async findOne(issueId: number) {
    return this.prisma.issue.findUnique({
      where: { id: issueId },
      include: { comment: { include: { user: true } } },
    });
  }

  findByProject(projectId: number) {
    return this.prisma.issue.findMany({ where: { projectId: projectId } });
  }

  async update(id: number, updateIssueDto: UpdateIssueDto) {
    try {
      return await this.prisma.issue.update({
        where: { id },
        data: updateIssueDto,
      });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.issue.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }
}
