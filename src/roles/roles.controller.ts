import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Roles} from "../auth/roles-auth.decorator";

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {
    }

    @Post()
    @Roles("USER")
    create(@Body() userDto: CreateRoleDto) {
        return this.roleService.createRole(userDto)
    }

    @Get('/:value')
    @Roles("ADMIN")
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }

}
