import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Article } from "./articles.model";
import { Tag } from "../tags/tags.model";

@Table({ tableName: 'article_tags' })
export class ArticleTag extends Model<ArticleTag> {
    @ForeignKey(() => Article)
    @Column({ type: DataType.INTEGER, allowNull: false })
    articleId: number

    @ForeignKey(() => Tag)
    @Column({ type: DataType.INTEGER, allowNull: false })
    tagId: number
}
