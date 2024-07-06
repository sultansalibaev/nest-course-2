import {Module} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Article} from "./articles.model";
import {FilesModule} from "../files/files.module";
import { CommentsModule } from 'src/comments/comments.module';
import { ArticleComments } from 'src/comments/article-comments.model';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article, ArticleComments]),
    FilesModule,
    CommentsModule
  ],
  exports: [
    ArticlesService
  ]
})
export class ArticlesModule {}
