import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import { Article } from "src/articles/articles.model";
// import { ArticleComments } from "./article-comments.model";

export interface CommentCreationAttrs {
    text: string
    articleId: number
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    text: string

    @ForeignKey(() => Article)
    @Column({ type: DataType.INTEGER })
    articleId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    author: User

    // @BelongsTo(() => Article)
    // article: Article[]
}