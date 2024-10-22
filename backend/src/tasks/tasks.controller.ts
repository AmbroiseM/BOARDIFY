import { Controller, UseGuards } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";




@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {

    constructor(private readonly tasksService: TasksService) {
    }
}