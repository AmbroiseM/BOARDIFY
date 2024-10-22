import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsserController } from './users.controller';
import { UserRepository } from './repositories/user.repository';
import { ProjectsModule } from 'src/projects/projects.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersGateway } from './users.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ProjectsModule), JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '1h' },
        }),
        inject: [ConfigService],
    })],
    providers: [UserService, UserRepository, UsersGateway],
    controllers: [UsserController],
    exports: [UserService,UserRepository, UsersGateway],
})
export class UserModule { }
