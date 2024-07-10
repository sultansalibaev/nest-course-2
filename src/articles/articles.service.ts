import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ArticleImageBlock, CreateArticleDto} from "./dto/create-article.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Article, ArticleCreationAttrs} from "./articles.model";
import {FilesService} from "../files/files.service";
import { getPublicUserData } from 'src/shared/common';

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
        });

        // @ts-ignore
        article.dataValues.author.dataValues = getPublicUserData(article?.dataValues?.author?.dataValues);

        return article
    }

    async create(dto: CreateArticleDto, userId: number, images: any) {
        console.log('images', images);

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
    }

    async getArticle(id: number) {
        const article = await this.articleRepository.findByPk(id)

        if (!article) throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND)

        return article
    }

    async updateArticle(newArticle: CreateArticleDto) {
        const article = await this.articleRepository.findByPk(newArticle?.id)

        Object.entries(newArticle).forEach(([key, value]) => {
            article[key] = value
        });

        article.save();

        return article;
    }
}
