import { Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import { Article } from "src/entities/articles/articles.model";
import { Comment } from "src/entities/comments/comments.model";

@Table({ tableName: 'article_comments', createdAt: false, updatedAt: false })
export class ArticleComments extends Model<ArticleComments> {

    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Comment)
    @Column({ type: DataType.INTEGER })
    commentId: number

    @ForeignKey(() => Article)
    @Column({ type: DataType.INTEGER })
    articleId: number

}