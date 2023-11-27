import { Issue, IssuePriority, IssueStatus, IssueType } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class IssueEntity implements Issue {
  constructor({ user, ...data }: Partial<IssueEntity>) {
    Object.assign(this, data);
    if (user) {
      this.user = new UserEntity(user);
    }
  }
  id: number;
  title: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  listPosition: number;
  description: string;
  descriptionText: string;
  estimate: number;
  timeSpent: number;
  timeRemaining: number;
  createdAt: Date;
  updatedAt: Date;
  projectId: number;
  userId: number;
  user: UserEntity;
}
