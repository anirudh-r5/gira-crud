import { Controller } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd: 'createProject' })
  create(createProjectDto: any) {
    console.log(createProjectDto);
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd: 'allProjects' })
  findAll() {
    return this.projectsService.findAll();
  }

  @MessagePattern({ cmd: 'findProject' })
  findOne(id: string) {
    return this.projectsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'editProject' })
  update(data: { id: string; updateProjectDto: UpdateProjectDto }) {
    return this.projectsService.update(
      parseInt(data.id),
      data.updateProjectDto,
    );
  }

  @MessagePattern({ cmd: 'deleteProject' })
  remove(id: string) {
    return this.projectsService.remove(+id);
  }
}
