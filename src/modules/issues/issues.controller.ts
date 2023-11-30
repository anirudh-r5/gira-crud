import { Controller } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueEntity } from './entities/issue.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @MessagePattern({ cmd: 'createIssue' })
  async create(createIssueDto: any) {
    return this.issuesService.create(createIssueDto);
  }

  @MessagePattern({ cmd: 'findIssue' })
  async findOne(issueId: number) {
    return new IssueEntity(await this.issuesService.findOne(issueId));
  }

  @MessagePattern({ cmd: 'findProjectIssues' })
  async findByProject(projectId: number) {
    const issues = await this.issuesService.findByProject(projectId);
    return issues.map((issue) => new IssueEntity(issue));
  }

  @MessagePattern({ cmd: 'editIssue' })
  update(data: { id: string; updateIssueDto: UpdateIssueDto }) {
    return this.issuesService.update(parseInt(data.id), data.updateIssueDto);
  }

  @MessagePattern({ cmd: 'deleteIssue' })
  remove(id: string) {
    return this.issuesService.remove(+id);
  }
}
