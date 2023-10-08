import {Body, Controller, Post, Res} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    async login(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res) {
        const { token } = await this.authService.login(userDto)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + (60 * 1000)),
        })
        return { status: 'ok', token }
    }

    @Post('/logout')
    logout(@Res({ passthrough: true }) res) {
        res.clearCookie('access_token')
        return {}
    }

    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto) {
        const result = await this.authService.registration(userDto)

        return result
    }

    @Post('/refresh')
    async refresh(@Body() body: { oldToken: string }, @Res({ passthrough: true }) res) {
        const { token } = await this.authService.refreshToken(body.oldToken)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + (60 * 1000)),
        })
        return { status: 'ok', token }
    }


}
