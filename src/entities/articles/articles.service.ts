import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ArticleImageBlock, CreateArticleDto} from "./dto/create-article.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Article, ArticleCreationAttrs} from "./articles.model";
import {FilesService} from "src/features/files/files.service";
import { buildQueryOptions, getPublicUserData } from 'src/shared/common';
import { User } from '../users/users.model';
import { Profile } from 'src/features/profile/profile.model';
import { Type } from '../types/types.model';
import { TypesService } from '../types/types.service';
import { TagsService } from '../tags/tags.service';
import { Tag } from '../tags/tags.model';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectModel(Article) private articleRepository: typeof Article,
        private fileService: FilesService,
        private typeService: TypesService,
        private tagService: TagsService,
    ) {
    }

    async getArticleComments(id: number) {
        const article = await this.articleRepository.findOne({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'phone', 'email'],
                    include: [
                        {
                            model: Profile,
                            attributes: ['avatar'],
                        },
                    ],
                },
                {
                    model: Type,
                    attributes: ['id', 'name', 'description'],
                },
                {
                    model: Tag,
                    attributes: ['id', 'name', 'description'],
                },
            ],
            where: { id }
        });

        let articleData = article.get({ plain: true });

        if (articleData?.author) {
            articleData.author = {
                ...getPublicUserData(articleData?.author),
                avatar: articleData.author?.profile?.avatar
            };
        }

        return articleData;
    }

    async getArticles(query: object) {
        const articles = await this.articleRepository.findAll({
            include: [
                {
                    model: User,
                    attributes: ['id', 'username', 'phone', 'email'],
                    include: [
                        {
                            model: Profile,
                            attributes: ['avatar'],
                        },
                    ],
                },
                {
                    model: Type,
                    attributes: ['id', 'name', 'description'],
                },
                {
                    model: Tag,
                    attributes: ['id', 'name', 'description'],
                },
            ],
            ...buildQueryOptions(query, 'title', this.articleRepository)
        });

        let articlesData = articles?.map?.(item => {
            let article = item?.get({ plain: true });
            if (article?.author) {
                article.author = {
                    ...getPublicUserData(article?.author),
                    avatar: article.author?.profile?.avatar
                };
            }
            return article;
        });

        return articlesData;
    }

    async create(dto: CreateArticleDto, userId: number, images: any) {
        console.log('images', images);

        if (images.length) {
            let image_index = 0;
            
            for (let i = 0; i < dto.blocks.length; i++) {
                if (dto.blocks[i].type == 'image') {
                    let block = (dto.blocks[i] as ArticleImageBlock);
                    let fileName = await this.fileService.createFile(images[image_index]);
                    block.src = fileName;
                    console.log('fileName', fileName);
                    image_index++;
                }
            }
        }

        const article = await this.articleRepository.create({...dto, views: Number(dto?.views), userId});

        const typeList = typeof dto?.type == 'string' ? JSON.parse(dto?.type) : dto?.type;
        console.log('typeList', typeList);
        
        if (typeList?.length) {
            const types = await this.typeService.findByIds(typeList)
            await article.$set('types', types?.map?.(item => item.get({ plain: true })?.id))
            article.dataValues.types = types?.map?.(item => item.get({ plain: true }))
        }

        const tagList = typeof dto?.tag == 'string' ? JSON.parse(dto?.tag) : dto?.tag;
        if (tagList?.length) {
            const tags = await this.tagService.findByIds(tagList)
            await article.$set('tags', tags?.map?.(item => item.get({ plain: true })?.id))
            article.dataValues.tags = tags?.map?.(item => item.get({ plain: true }))
        }

        return article;
    }

    async getArticle(id: number) {
        const article = await this.articleRepository.findByPk(id)

        if (!article) throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND)

        return article
    }

    async updateArticle(newArticle: CreateArticleDto) {
        const article = await this.articleRepository.findByPk(newArticle?.id);

        Object.entries(newArticle).forEach(([key, value]) => {
            article[key] = value;
        });

        article.save();

        return article;
    }
}
