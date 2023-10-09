import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User, UserCreationAttrs} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
// import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
// import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) {
    }
    async createUser(dto: UserCreationAttrs) {

        const user = await this.userRepository.create(dto)

        // await this.mailerService.sendActivationMail(dto.email, `${process.env.API_URL}/api/activate/${activationLink}`)
        const role = await this.roleService.getRoleByValue('USER')

        await user.$set('roles', [role.id])

        user.roles = [role]

        return user
    }

    async getAllUser() {
        const users = await this.userRepository.findAll({
            include: { all: true }
        })

        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            include: { all: true }
        })
        return user
    }

    async updateRefreshToken(userId: number, refresh_token: string) {
        const user = await this.userRepository.findByPk(userId)

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        user.refreshToken = refresh_token

        await user.save()

        return user
    }

    async updateAccessToken(userId: number, access_token: string) {
        const user = await this.userRepository.findByPk(userId)

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        user.accessToken = access_token

        await user.save()

        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)

        if (role && user) {
            await user.$add('role', role.id)
            return dto
        }

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)

        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        user.banned = true
        user.banReason = dto.banReason

        await user.save()

        return user
    }

    async activate(link: string) {
        const user = await this.userRepository.findOne({
            where: { activationLink: link },
            include: { all: true }
        })

        if (!user) throw new HttpException('Некорректный ссылка активации', HttpStatus.BAD_REQUEST)

        user.isActivated = true

        await user.save()

        return user
    }
}
