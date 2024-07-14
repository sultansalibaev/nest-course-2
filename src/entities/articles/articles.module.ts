import {Module, forwardRef} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "src/entities/users/users.model";
import {Article} from "./articles.model";
import {FilesModule} from "src/features/files/files.module";
import { ArticleType } from './article-type.model';
import { Type } from '../types/types.model';
import { TypesModule } from '../types/types.module';
import { Tag } from '../tags/tags.model';
import { ArticleTag } from './article-tag.model';
import { TagsModule } from '../tags/tags.module';
// import { ArticleComments } from 'src/entities/comments/article-comments.model';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    forwardRef(() => TypesModule),
    forwardRef(() => TagsModule),
    SequelizeModule.forFeature([User, Article, ArticleType, Type, Tag, ArticleTag]), // ArticleComments
    FilesModule,
    TypesModule,
    TagsModule,
  ],
  exports: [
    ArticlesService
  ]
})
export class ArticlesModule {}
