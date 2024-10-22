import { forwardRef, Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { ProjectRepository } from './repositories/project.repository';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), ConfigModule, forwardRef(() => UserModule)],
  controllers: [ProjectsController],
  providers: [ProjectsService, ProjectRepository, JwtService],
  exports: [ProjectsService, ProjectRepository],
})
export class ProjectsModule {}
