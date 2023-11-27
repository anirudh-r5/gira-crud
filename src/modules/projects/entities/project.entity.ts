import { Project, ProjectCategory } from '@prisma/client';

export class ProjectEntity implements Project {
  id: number;
  name: string;
  url: string;
  description: string;
  category: ProjectCategory;
  createdAt: Date;
  updatedAt: Date;
}
