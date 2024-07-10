import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment, CommentCreationAttrs } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ArticlesService } from 'src/articles/articles.service';
import { getPublicUserData } from 'src/shared/common';

@Injectable()
export class CommentsService {

    constructor(
        @InjectModel(Comment) private commentRepository: typeof Comment,
        private articleService: ArticlesService,
    ) {
    }

    async getComments(query: object) {
        const keyName = Object.keys(query)?.find?.(key => key?.includes?.('Id') && !isNaN(Number(query?.[key])))

        if (keyName == undefined) throw new HttpException('Комментарии не найдены', HttpStatus.NOT_FOUND);

        const comments = await this.commentRepository.findAll({
            include: { all: true },
            where: {
                [keyName]: query?.[keyName]
            }
        });

        if (!comments?.length) throw new HttpException('Комментарии не найдены', HttpStatus.NOT_FOUND)

        comments.forEach(comment => {
            // @ts-ignore
            comment.dataValues.author.dataValues = getPublicUserData(comment?.dataValues?.author?.dataValues);
        })

        return comments
    }

    async create(dto: CreateCommentDto) {
        // const comment = await this.commentRepository.create(dto)

        // const article = await this.articleService.getArticleComments(dto?.articleId)

        // await article.$set('comments', [...(article.comments ?? [])?.map?.(item => item?.id), comment.id])

        // return comment
        return await this.commentRepository.create(dto)
    }

    async updateComment(newComment: CreateCommentDto) {
        // @ts-ignore
        const comment = await this.commentRepository.findByPk(newComment?.id)

        comment.text = newComment.text;

        comment.save();

        return comment;
    }
}
