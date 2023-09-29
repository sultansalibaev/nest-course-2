import {Body, Controller, Post, Res, SetMetadata} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {AuthGuardConfig} from "./roles.guard";
import {ROLES_KEY} from "./roles-auth.decorator";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('/login')
    @SetMetadata(ROLES_KEY, { disabled: true } as AuthGuardConfig)
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
    @SetMetadata(ROLES_KEY, { disabled: true } as AuthGuardConfig)
    logout(@Res({ passthrough: true }) res) {
        res.clearCookie('access_token')
        return {}
    }

    @Post('/registration')
    @SetMetadata(ROLES_KEY, { disabled: true } as AuthGuardConfig)
    async registration(@Body() userDto: CreateUserDto) {
        const result = await this.authService.registration(userDto)

        return result
    }

    @Post('/refresh')
    @SetMetadata(ROLES_KEY, { disabled: true } as AuthGuardConfig)
    async refresh(@Body() email: { email: string }, @Res({ passthrough: true }) res) {
        const { token } = await this.authService.refreshToken(email.email)
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            expires: new Date(Date.now() + (60 * 1000)),
        })
        return { status: 'ok', token }
    }

}
