import { Module } from '@nestjs/common';
import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from './entites/sprint.entity';
import { SprintRepository } from './repositories/sprint.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sprint])
  ],
  controllers: [SprintController],
  providers: [SprintService, SprintRepository],
  exports: [SprintService]
})
export class SprintModule {}
