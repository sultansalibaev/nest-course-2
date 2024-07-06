import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User, UserInfo} from "../users/users.model";
import {ArticleBlock} from "./dto/create-article.dto";
import { Comment } from "src/comments/comments.model";
import { ArticleComments } from "src/comments/article-comments.model";

export interface ArticleCreationAttrs {
    title: string
    views: number
    tags: string[]
    type: string[]
    userId: number
    images?: string
    blocks: ArticleBlock[]
}

@Table({tableName: 'articles'})
export class Article extends Model<Article, ArticleCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    title: string

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    views: number

    @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    tags: []

    @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    type: []

    @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    blocks: []

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @BelongsTo(() => User)
    author: UserInfo

    @BelongsToMany(() => Comment, () => ArticleComments)
    comments: Comment[]
}
