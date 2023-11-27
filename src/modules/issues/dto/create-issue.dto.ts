import { IssuePriority, IssueStatus, IssueType } from '@prisma/client';

export class CreateIssueDto {
  title: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  listPosition: number;
  description?: string;
  descriptionText?: string;
  estimate?: number;
  timeSpent?: number;
  timeRemaining?: number;
  projectId: number;
  userId: number;
}
