import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";

@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {
    }

    @Post()
    create(@Body() userDto: CreateRoleDto) {
        return this.roleService.createRole(userDto)
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }

}
