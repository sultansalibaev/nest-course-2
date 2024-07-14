import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import { Article } from "../articles/articles.model";
import { ArticleType } from "../articles/article-type.model";
// import {User} from "src/entities/users/users.model";
// import {UserRoles} from "./user-roles.model";

interface TypeCreationAttrs {
    name: string
    description: string
}

@Table({tableName: 'types'})
export class Type extends Model<Type, TypeCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({example: 'IT', description: 'Название типа новости/статьи/поста/...'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string

    @ApiProperty({example: 'Information Technology', description: 'Описание типа новости/статьи/поста/...'})
    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @BelongsToMany(() => Article, () => ArticleType)
    articles: Article[]

    // @BelongsToMany(() => User, () => UserRoles)
    // users: User[]
}