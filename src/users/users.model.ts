import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {Article} from "../articles/articles.model";
import {Profile} from "../profile/profile.model";
import { Comment } from "src/comments/comments.model";

export interface UserCreationAttrs {
    email: string
    password: string
    activationLink?: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING(48), allowNull: true })
    username: string

    @Column({ type: DataType.STRING(31), allowNull: true })
    phone: string

    @ApiProperty({example: 'user@mail.ru', description: 'Уникальный почтовый адрес'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({example: '12345678', description: 'Пароль'})
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({example: 'true', description: 'Забанен или нет'})
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки'})
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @Column({ type: DataType.STRING(1000), allowNull: true })
    accessToken: string

    @Column({ type: DataType.STRING(1000), allowNull: true })
    refreshToken: string

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    isActivated: boolean

    @Column({ type: DataType.STRING })
    activationLink: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Article)
    articles: Article[]

    @HasMany(() => Comment)
    comments: Comment[]

    @HasMany(() => Profile)
    profile: Profile[]
}