import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "src/entities/users/users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "src/entities/users/users.model";
import {Roles} from "src/features/auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import * as process from "process";
import {RolesGuard} from "src/features/auth/roles.guard";

@ApiTags('Пользователи')
@Controller('users')
@UseGuards(RolesGuard)
@Roles("admin")
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    async getAll() {
        return await this.usersService.getAllUser()
    }
    @ApiOperation({summary: 'Выдать роль'})
    @ApiResponse({status: 200 })
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }
    @ApiOperation({summary: 'Заблокировать пользователя'})
    @ApiResponse({status: 200 })
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }
    @Get('/activate/:link')
    @Roles("admin", "user")
    async activate(@Req() req: any, @Res() res: any) {

        const activationLink = req.params.link

        await this.usersService.activate(activationLink)

        return res.redirect(process.env.CLIENT_URL);
    }
}
