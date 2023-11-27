import { Controller, Body, Param } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { IssueEntity } from './entities/issue.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @MessagePattern({ cmd: 'createIssue' })
  async create(@Body() createIssueDto: CreateIssueDto) {
    return this.issuesService.create(createIssueDto);
  }

  @MessagePattern({ cmd: 'findIssue' })
  async findOne(@Param('issueId') issueId: number) {
    return new IssueEntity(await this.issuesService.findOne(issueId));
  }

  @MessagePattern({ cmd: 'findProjectIssues' })
  async findByProject(@Param('projectId') projectId: number) {
    const issues = await this.issuesService.findByProject(projectId);
    return issues.map((issue) => new IssueEntity(issue));
  }

  @MessagePattern({ cmd: 'editIssue' })
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(+id, updateIssueDto);
  }

  @MessagePattern({ cmd: 'deleteIssue' })
  remove(@Param('id') id: string) {
    return this.issuesService.remove(+id);
  }
}
