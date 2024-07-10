import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import { CreateCommentDto, entityType } from "./dto/create-comment.dto";

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CreateCommentDto> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING, allowNull: false })
    text: string

    // @ForeignKey(() => Article)
    // @Column({ type: DataType.INTEGER })
    // articleId: number

    @Column({ type: DataType.INTEGER, allowNull: false })
    entityId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    entityType: entityType;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number

    @BelongsTo(() => User)
    author: User

    // @BelongsTo(() => Article)
    // article: Article[]
}