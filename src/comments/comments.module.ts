import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comments.model';
import { Article } from 'src/articles/articles.model';
import { SequelizeModule } from '@nestjs/sequelize';
// import { ArticleComments } from './article-comments.model';
import { ArticlesModule } from 'src/articles/articles.module';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService],
  imports: [
    forwardRef(() => ArticlesModule),
    SequelizeModule.forFeature([Comment, Article]), // ArticleComments
    ArticlesModule
  ],
  exports: [
      CommentsService
  ]
})
export class CommentsModule {}
