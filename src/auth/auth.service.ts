import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
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

            // const { token: refresh_token } = await this.generateToken(user, {expiresIn: '30d'})
            // await this.userService.updateRefreshToken(user.id, refresh_token)
            return await this.generateToken(user)
        }
        catch (e) {
            console.log(e)
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
        if (typeof oldUser == 'string') return { token: null }
        const user = await this.userService.getUserByEmail(oldUser?.email)

        if (!user) {
            throw new HttpException('Пользователь с таким email не существует', HttpStatus.BAD_REQUEST)
        }

        console.log('refreshToken', user.refreshToken)

        let is_old_token = await this.verifyToken(user.refreshToken)

        return is_old_token
            ? this.generateToken(user)
            : { token: null }
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

    private async generateToken(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
            roles: user.roles
        }

        const result: {token:string} = {
            token: this.jwtService.sign(payload)
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
