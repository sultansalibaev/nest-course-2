import { Module, forwardRef } from '@nestjs/common';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Article } from '../articles/articles.model';
import { Type } from './types.model';
import { ArticleType } from '../articles/article-type.model';

@Module({
  controllers: [TypesController],
  providers: [TypesService],
  imports: [
    SequelizeModule.forFeature([Type, Article, ArticleType]), // ArticleComments
  ],
  exports: [
    TypesService
  ]
})
export class TypesModule {}
