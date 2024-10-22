import { Controller, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { SprintService } from "./sprint.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { CreateSprintDto } from "./dto/create-sprint.dto";
import { Sprint } from "./entites/sprint.entity";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "src/users/entities/user.entity";

@Controller('sprint')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SprintController {

    constructor(private readonly sprintService: SprintService) { }

    @Post()
    @Roles(UserRole.MANAGER, UserRole.PO)
    async createSprint(sprint: CreateSprintDto): Promise<Sprint> {
        return await this.sprintService.createSprint(sprint)
    }

    @Patch(':id')
    @Roles(UserRole.MANAGER, UserRole.PO)
    async updateSprint(@Param('id') id: number, updateSprint: Partial<CreateSprintDto>): Promise<Sprint> {
        return await this.sprintService.updateSprint(id, updateSprint)
    }
}