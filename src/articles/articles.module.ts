import {Module, forwardRef} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.model";
import {Article} from "./articles.model";
import {FilesModule} from "../files/files.module";
// import { ArticleComments } from 'src/comments/article-comments.model';

@Module({
  providers: [ArticlesService],
  controllers: [ArticlesController],
  imports: [
    SequelizeModule.forFeature([User, Article]), // ArticleComments
    FilesModule,
  ],
  exports: [
    ArticlesService
  ]
})
export class ArticlesModule {}
