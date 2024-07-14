import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Article } from "../articles/articles.model";
import { ArticleTag } from "../articles/article-tag.model";
// import {User} from "src/entities/users/users.model";
// import {UserRoles} from "./user-roles.model";

interface TagCreationAttrs {
    name: string
    description: string
}

@Table({tableName: 'tags'})
export class Tag extends Model<Tag, TagCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: 'IT', description: 'Название тега новости/статьи/поста/...'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string

    @ApiProperty({example: 'Information Technology', description: 'Описание тега новости/статьи/поста/...'})
    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @BelongsToMany(() => Article, () => ArticleTag)
    articles: Article[]

    // @BelongsToMany(() => User, () => UserRoles)
    // users: User[]
}