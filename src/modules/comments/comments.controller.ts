import { Controller } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentEntity } from './entities/comment.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @MessagePattern({ cmd: 'createComment' })
  async create(createCommentDto: CreateCommentDto) {
    return new CommentEntity(
      await this.commentsService.create(createCommentDto),
    );
  }

  @MessagePattern({ cmd: 'editComment' })
  async update(data: { id: string; updateCommentDto: UpdateCommentDto }) {
    return new CommentEntity(
      await this.commentsService.update(
        parseInt(data.id),
        data.updateCommentDto,
      ),
    );
  }

  @MessagePattern({ cmd: 'deleteComment' })
  async remove(id: string) {
    return new CommentEntity(await this.commentsService.remove(+id));
  }
}
