import { Controller, Body, Param } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern({ cmd: 'createComment' })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return new CommentEntity(
      await this.commentsService.create(createCommentDto),
    );
  }

  @MessagePattern({ cmd: 'editComment' })
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return new CommentEntity(
      await this.commentsService.update(+id, updateCommentDto),
    );
  }

  @MessagePattern({ cmd: 'deleteComment' })
  async remove(@Param('id') id: string) {
    return new CommentEntity(await this.commentsService.remove(+id));
  }
}
