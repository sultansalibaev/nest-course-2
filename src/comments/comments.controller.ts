import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';

@ApiTags('Профили')
@UseGuards(RolesGuard)
@Roles("admin", "user")
@Controller('comments')
export class CommentsController {
    
    constructor(private commentsService: CommentsService) {
    }

    // @ApiOperation({summary: 'Получить данные о своём пользователе'})
    // @ApiResponse({status: 200, type: Comment})
    // @UseGuards(RolesGuard)
    // @Roles("admin", "user")
    // @Get()
    // async getProfile(@Req() request) {
    //     const user = request.user;

    //     return await this.commentsService.getArticleComments(user)
    // }
}
