import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService, JwtSignOptions} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";
import * as uuid from 'uuid';
import {MailerService} from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) {
    }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)

        const { token: refresh_token } = await this.generateToken(user, {expiresIn: '30d'})
        this.userService.updateRefreshToken(user.id , refresh_token)
        return this.generateToken(user)
    }

    async refreshToken(email: string) {
        const user = await this.userService.getUserByEmail(email)

        if (!user) {
            throw new HttpException('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST)
        }

        console.log('refreshToken', user.refreshToken)

        let is_old_token = this.jwtService.verify(user.refreshToken)

        return is_old_token
            ? this.generateToken(user)
            : { token: null }
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const activationLink = uuid.v4(); // v34fa-asfasf-142saf-sa-asf
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
            activationLink
        })
        const activation_link = `${process.env.API_URL}/users/activate/${activationLink}`
        console.log('activation_link', activation_link)
        await this.mailerService
            .sendMail({
                to: user.email, // list of receivers
                subject: 'Активация аккаунта', // Subject line
                template: 'confirm-email',
                context: {
                    link: activation_link
                }
            })
            .then(() => {})
            .catch(() => {});

        // return this.generateToken(user)
        return user
    }

    private async generateToken(user: User, options?: JwtSignOptions) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles
        }

        const result: {token:string} = {
            token: this.jwtService.sign(payload, options)
        }

        return result
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)

        if (user && passwordEquals) {
            return user
        }

        throw new UnauthorizedException({
            message: 'Некорректный email или пароль'
        })
    }
}
