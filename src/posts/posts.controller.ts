import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @Roles("admin", "user")
    @UseGuards(RolesGuard)
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image)
    }
}
