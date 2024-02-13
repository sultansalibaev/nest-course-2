import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ArticleImageBlock, CreateArticleDto} from "./dto/create-article.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Article} from "./articles.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class ArticlesService {

    constructor(@InjectModel(Article) private articleRepository: typeof Article, private fileService: FilesService) {
    }

    async create(dto: CreateArticleDto, userId: number, images: any) {
        if (images.length) {
            console.log('images', images)
            let image_index = 0
            for (let i = 0; i < dto.blocks.length; i++) {
                if (dto.blocks[i].type == 'image') {
                    image_index++
                    let block = (dto.blocks[i] as ArticleImageBlock)
                    let fileName = await this.fileService.createFile(images[image_index])
                    block.src = fileName
                }
            }
        }
        // const article = await this.articleRepository.create({...dto, userId})

        return {...dto, userId}
    }

    async getArticle(id: number) {
        const article = await this.articleRepository.findByPk(id)

        if (!article) throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND)

        return article
    }
}
