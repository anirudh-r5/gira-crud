import { Controller, Body, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd: 'createProject' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd: 'allProjects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @MessagePattern({ cmd: 'findProject' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'editProject' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @MessagePattern({ cmd: 'deleteProject' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
