import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService, JwtSignOptions} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import {User} from "../users/users.model";
import * as uuid from 'uuid';
import {MailerService} from "@nestjs-modules/mailer";
import * as process from "process";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private mailerService: MailerService
    ) {
    }

    async login(userDto: CreateUserDto) {
        try {
            const user = await this.validateUser(userDto)

            const { token: refresh_token } = await this.generateToken(user, {expiresIn: '14d'})
            const { token: access_token } = await this.generateToken(user)

            await this.userService.updateAccessToken(user.id, access_token)
            await this.userService.updateRefreshToken(user.id, refresh_token)


            const refresh_payload = await this.getPayloadFromExpiredToken(refresh_token)

            if (typeof refresh_payload == 'string') return { token: null, expired: Date.now() }

            return { token: access_token, expired: refresh_payload?.exp }
        }
        catch (error) {
            throw new HttpException(error.response.message, error.status)
        }
    }


    async getPayloadFromExpiredToken(token: string) {
        try {
            const decodedToken = jwt.decode(token, { complete: true });
            if (!decodedToken) {
                throw new Error('Invalid token');
            }

            return decodedToken.payload;
        } catch (error) {
            // Handle token decoding errors here (e.g., invalid token)
            throw new Error('Token decoding failed');
        }
    }
    async refreshToken(oldToken: string) {
        const oldUser = await this.getPayloadFromExpiredToken(oldToken)
        if (typeof oldUser == 'string') return { token: null, expired: Date.now() }
        const user = await this.userService.getUserByEmail(oldUser?.email)

        if (!user) {
            throw new HttpException('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST)
        }

        const refresh_payload = await this.getPayloadFromExpiredToken(user.refreshToken)

        if (typeof refresh_payload == 'string') return { token: null, expired: Date.now() }

        let is_old_token = await this.verifyToken(user.refreshToken)

        const new_access_token = is_old_token
            ? {...(await this.generateToken(user)), expired: refresh_payload?.exp}
            : { token: null, expired: Date.now() }

        if (user.accessToken != oldToken) {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован'
            })
        }

        await this.userService.updateAccessToken(user.id, new_access_token.token)

        return new_access_token
    }
    async verifyToken(token: string) {
        try {
            this.jwtService.verify(token);
            return true;
        } catch (error) {
            return false;
        }
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
