import {Body, Controller, Get, Param, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreateArticleDto} from "./dto/create-article.dto";
import {ArticlesService} from "./articles.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Roles} from "src/features/auth/roles-auth.decorator";
import {RolesGuard} from "src/features/auth/roles.guard";

@Controller('articles')
export class ArticlesController {

    constructor(private articleService: ArticlesService) {
    }

    @Post()
    @UseInterceptors(FilesInterceptor('images'))
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    createArticle(@Body() dto: CreateArticleDto, @Req() request, @UploadedFiles() images?: any) {
        const userId = request.user.id
        return this.articleService.create(dto, userId, images)
    }

    @Get(':id')
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    async getArticle(@Param('id') id: number) {
        return await this.articleService.getArticleComments(id)
    }

    @Get()
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    async getArticles(@Query() query) {
        return await this.articleService.getArticles(query)
    }
}
