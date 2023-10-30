import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";

export interface ProfileCreationAttrs {
    username?: string
    balance?: number
    phone?: string
    avatar?: string
    gender?: string
    firstname?: string
    lastname?: string
    age?: number
    currency?: string
    country?: string
    city?: string
    birth_date?: number
}

@Table({tableName: 'profile'})
export class Profile extends Model<Profile, ProfileCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @Column({ type: DataType.STRING(48), allowNull: true })
    username: string

    @Column({ type: DataType.BIGINT, allowNull: false, defaultValue: 0 })
    balance: number

    @Column({ type: DataType.STRING(31), allowNull: true })
    phone: string

    @Column({ type: DataType.STRING, allowNull: true })
    avatar: string

    @Column({ type: DataType.STRING, allowNull: true })
    gender: string

    @Column({ type: DataType.STRING, allowNull: true })
    firstname: string

    @Column({ type: DataType.STRING, allowNull: true })
    lastname: string

    @Column({ type: DataType.INTEGER, allowNull: true })
    age: number

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'RUB' })
    currency: string

    @Column({ type: DataType.STRING, allowNull: true })
    country: string

    @Column({ type: DataType.STRING, allowNull: true })
    city: string

    @Column({ type: DataType.BIGINT, allowNull: true })
    birth_date: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}