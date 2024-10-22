import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UserRole } from 'src/users/entities/user.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthInterceptor } from 'src/common/Interceptor/auth.interceptor';
import { ProjectCardDto } from './dto/projet-card.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(AuthInterceptor)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @Roles(UserRole.DIRECTOR)
  async createProject(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.createProject(createProjectDto);
  }

  @Get('all')
  async getProjects() {
    return await this.projectsService.getProjects();
  }

  @Get('user/:id')
  async getProjectById(@Param('id') id: number) {
    return await this.projectsService.getProjectForUser(id);
  }

  @Get(':id/members')
  async getMembersForProject(@Param('id') id: number) {

    console.log("memebers: ", await this.projectsService.getMembersForProject(id))
    return await this.projectsService.getMembersForProject(id);
  }


  @Get('card/:id')
  async getProjectCardByid(@Param('id') id: number) : Promise<ProjectCardDto | null> {
    return await this.projectsService.getProjectByid(id);
  }
}
