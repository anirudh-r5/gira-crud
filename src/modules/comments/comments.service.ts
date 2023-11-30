import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}
  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.comment.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2025') return 0;
    }
  }
}
