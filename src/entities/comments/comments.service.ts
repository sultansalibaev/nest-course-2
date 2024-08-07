import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ArticlesService } from 'src/entities/articles/articles.service';
import { getPublicUserData } from 'src/shared/common';
import { User } from 'src/entities/users/users.model';
import { Profile } from 'src/features/profile/profile.model';

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
            ],
            where: {
                entityType: entity_type,
                entityId: query?.[keyName],
            },
        });

        if (!comments?.length) throw new HttpException('Комментарии не найдены', HttpStatus.NOT_FOUND)

        comments = comments.map(comment => {
            let item = comment.get({ plain: true });

            // item.author = getPublicUserData(item?.author);

            item.author.avatar = item.author.profile.avatar;
            delete item.author.profile;

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
