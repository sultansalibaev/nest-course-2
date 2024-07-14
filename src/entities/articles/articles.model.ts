import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "src/entities/users/users.model";
import {ArticleBlock} from "./dto/create-article.dto";
import { Comment } from "src/entities/comments/comments.model";
import { Type } from "../types/types.model";
// import { ArticleComments } from "src/entities/comments/article-comments.model";
import { ArticleType } from "./article-type.model";
import { Tag } from "../tags/tags.model";
import { ArticleTag } from "./article-tag.model";

export interface ArticleCreationAttrs {
    title: string
    image: string
    views: number
    tag?: number[]
    type?: number[]
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

    @Column({ type: DataType.STRING, allowNull: false })
    image: string

    @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 0 })
    views: number

    // @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    tag?: number[]

    // @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    type?: number[]

    @Column({ type: DataType.JSONB, allowNull: false, defaultValue: [] })
    blocks: []

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @BelongsTo(() => User)
    author: User

    @BelongsToMany(() => Type, () => ArticleType)
    types: Type[]

    @BelongsToMany(() => Tag, () => ArticleTag)
    tags: Tag[]

    // @BelongsToMany(() => Comment, () => ArticleComments)
    // comments: Comment[]
}
