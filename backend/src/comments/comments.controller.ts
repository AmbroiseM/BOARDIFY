import { Controller, UseGuards } from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { RolesGuard } from "src/common/guards/roles.guard";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";



@Controller('comments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentsController {

    constructor (private readonly commentsService: CommentsService) {}
}