import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {ArticleBlock} from "./dto/create-article.dto";

interface ArticleCreationAttrs {
    title: string
    content: string
    userId: number
    image: string
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

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false, defaultValue: [] })
    tags: []

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false, defaultValue: [] })
    type: []

    @Column({ type: DataType.ARRAY(DataType.JSON), allowNull: false, defaultValue: [] })
    blocks: []

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number

    @BelongsTo(() => User)
    author: User
}
