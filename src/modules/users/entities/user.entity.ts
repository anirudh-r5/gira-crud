import { User } from '@prisma/client';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: number | null;
}
