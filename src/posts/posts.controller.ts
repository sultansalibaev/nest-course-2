import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {Roles} from "../auth/roles-auth.decorator";

@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @Roles("USER")
    createPost(@Body() dto: CreatePostDto, @UploadedFile() image) {
        return this.postService.create(dto, image)
    }
}
