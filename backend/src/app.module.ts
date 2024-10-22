import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { SprintModule } from './sprint/sprint.module';
import { TasksModule } from './tasks/tasks.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('TYPEORM_HOST') || 'localhost',
        port: configService.get('TYPEORM_PORT') || 5432,
        username: configService.get('TYPEORM_USERNAME') || 'postgres',
        password: configService.get('TYPEORM_PASSWORD') || 'postgres',
        database: configService.get('TYPEORM_DATABASE') || 'my_kanboard',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    TasksModule,
    ProjectsModule,
    AuthModule,
    SprintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}