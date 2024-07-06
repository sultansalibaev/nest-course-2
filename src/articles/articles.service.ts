import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ArticleImageBlock, CreateArticleDto} from "./dto/create-article.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Article, ArticleCreationAttrs} from "./articles.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class ArticlesService {

    constructor(
        @InjectModel(Article) private articleRepository: typeof Article,
        private fileService: FilesService
    ) {
    }

    async getArticleComments(id: number) {
        const article = await this.articleRepository.findOne({
            include: { all: true },
            where: { id }
        })

        // return article

        return {
            ...article,
            // @ts-ignore
            ...(article?.tags ? {tags: JSON.parse(article?.tags)} : {}),
            // @ts-ignore
            ...(article?.type ? {type: JSON.parse(article?.type)} : {}),
        } as ArticleCreationAttrs
    }

    // constructor(@InjectModel(Article) private articleRepository: typeof Article, private fileService: FilesService) {
    // }

    async create(dto: CreateArticleDto, userId: number, images: any) {
        console.log('images.length', images.length);
        
        if (images.length) {
            let image_index = 0
            
            for (let i = 0; i < dto.blocks.length; i++) {
                if (dto.blocks[i].type == 'image') {
                    let block = (dto.blocks[i] as ArticleImageBlock)
                    let fileName = await this.fileService.createFile(images[image_index])
                    block.src = fileName
                    console.log('fileName', fileName);
                    image_index++
                }
            }
        }
        const article = await this.articleRepository.create({...dto, views: Number(dto?.views), userId})

        return article
        // return {...dto, userId}
    }

    async getArticle(id: number) {
        const article = await this.articleRepository.findByPk(id)

        if (!article) throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND)

        return article
    }
}
