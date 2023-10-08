import {Body, Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {AddRoleDto} from "./dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import * as process from "process";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Пользователи')
@Controller('users')
@UseGuards(RolesGuard)
@Roles("ADMIN")
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Получить всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUser()
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
    @Roles("USER")
    async activate(@Req() req: any, @Res() res: any) {

        const activationLink = req.params.link

        await this.usersService.activate(activationLink)

        return res.redirect(process.env.CLIENT_URL);
    }
}
