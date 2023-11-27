import { Comment } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class CommentEntity implements Comment {
  constructor({ user, ...data }: Partial<CommentEntity>) {
    Object.assign(this, data);
    if (user) {
      this.user = new UserEntity(user);
    }
  }

  id: number;
  body: string;
  createdAt: Date;
  issueId: number;
  updatedAt: Date;
  userId: number;
  user: UserEntity;
}
