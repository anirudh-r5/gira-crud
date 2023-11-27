import { ProjectCategory } from '@prisma/client';

export class CreateProjectDto {
  name: string;
  url?: string;
  description?: string;
  category: ProjectCategory;
}
