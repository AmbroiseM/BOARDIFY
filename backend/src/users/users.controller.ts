import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { UserRole } from "./entities/user.entity";
import { Roles } from "src/common/decorators/roles.decorator";


@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsserController {

    constructor(private readonly userService: UserService) { }

    @Post()
    @Roles(UserRole.MANAGER, UserRole.DIRECTOR)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }

    @Patch()
    async updateUser(@Body() updateUserDto: Partial<CreateUserDto>) {
        return await this.userService.updateUser(updateUserDto.id, updateUserDto);
    }

    @Delete('delete/:id')
    @Roles(UserRole.MANAGER, UserRole.DIRECTOR)
    async deleteUser(@Param() id: number) {
        return await this.userService.deleteUser(id);
    }
}