import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CommentsService } from './comments.service';
import { Comment, CommentCreationAttrs } from './comments.model';

@ApiTags('Профили')
@UseGuards(RolesGuard)
@Roles("admin", "user")
@Controller('comments')
export class CommentsController {
    
    constructor(private commentsService: CommentsService) {
    }

    @ApiOperation({summary: 'Создать новый комментрарий'})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(RolesGuard)
    @Roles("admin", "user")
    @Post()
    async createComment(@Body() dto: CommentCreationAttrs, @Req() request) {
        const user = request.user;

        return await this.commentsService.create({...dto, userId: user?.id})
    }

    @ApiOperation({summary: 'Получить комментрарии'})
    @ApiResponse({status: 200, type: Comment})
    @UseGuards(RolesGuard)
    @Roles("admin", "user")
    @Get()
    async getComments(@Query() query) {
        return await this.commentsService.getComments(query)
    }
}
