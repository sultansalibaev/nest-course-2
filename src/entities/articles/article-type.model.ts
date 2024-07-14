import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Article } from "./articles.model";
import { Type } from "../types/types.model";

@Table({ tableName: 'article_types' })
export class ArticleType extends Model<ArticleType> {
    @ForeignKey(() => Article)
    @Column({ type: DataType.INTEGER, allowNull: false })
    articleId: number

    @ForeignKey(() => Type)
    @Column({ type: DataType.INTEGER, allowNull: false })
    typeId: number
}
