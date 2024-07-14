import { Module, forwardRef } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from '../articles/articles.model';
import { Tag } from './tags.model';
import { ArticleTag } from '../articles/article-tag.model';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [
    SequelizeModule.forFeature([Tag, Article, ArticleTag]), // ArticleComments
  ],
  exports: [
    TagsService
  ]
})
export class TagsModule {}
