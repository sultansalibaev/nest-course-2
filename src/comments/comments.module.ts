import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { Article } from 'src/articles/articles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ArticleComments } from './article-comments.model';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    SequelizeModule.forFeature([Comment, Article, ArticleComments])
  ],
  exports: [
      CommentsService
  ]
})
export class CommentsModule {}
