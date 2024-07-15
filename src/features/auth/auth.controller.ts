import {Body, Controller, HttpException, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "src/entities/users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {RolesGuard} from "./roles.guard";
import {Roles} from "./roles-auth.decorator";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res) {
        try {
            const { token, expired } = await this.authService.login(userDto)
            res.cookie('access_token', token, {
                httpOnly: true,
                secure: true, // false
                sameSite: 'strict', // None
                expires: new Date(expired * 1000),
            })
            return { status: 200, message: 'Вы успешно авторизованы' }
        }
        catch (error) {
            throw new HttpException(error.message, error.status)
        }
    }

    // @UseGuards(RolesGuard)
    // @Roles("admin", "user")
    @Post('/logout')
    async logout(@Res({ passthrough: true }) res, @Req() request) {
        const user = request.user

        await this.authService.logout(user)

        res.clearCookie('access_token')

        return { status: 200 }
    }

    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto) {
        const result = await this.authService.registration(userDto)

        return result
    }

    @Post('/refresh')
    async refresh(@Res({ passthrough: true }) res, @Req() request) {
        const oldToken = request.cookies['access_token']
        const { token, expired } = await this.authService.refreshToken(oldToken)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true, // false
            sameSite: 'strict', // None
            expires: new Date(expired * 1000),
        })
        return { status: 200 }
    }


}
