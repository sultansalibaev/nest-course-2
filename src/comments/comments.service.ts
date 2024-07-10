import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
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
        const keyName = Object.keys(query)?.find?.(
            key => key?.includes?.('Id') && !isNaN(Number(query?.[key]))
        );
        const entity_type = keyName?.replace?.('Id', '');

        if (keyName == undefined) throw new HttpException('Комментарии не найдены', HttpStatus.NOT_FOUND);

        let comments = await this.commentRepository.findAll({
            include: { all: true },
            where: {
                entityType: entity_type,
                entityId: query?.[keyName],
            },
        });

        if (!comments?.length) throw new HttpException('Комментарии не найдены', HttpStatus.NOT_FOUND)

        comments = comments.map(comment => {
            let item = comment.get({ plain: true });

            item.author = getPublicUserData(item?.author);

            return item;
        });

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
