import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {Roles} from "src/features/auth/roles-auth.decorator";
import {RolesGuard} from "src/features/auth/roles.guard";

@Controller('roles')
@Roles("admin")
@UseGuards(RolesGuard)
export class RolesController {

    constructor(private roleService: RolesService) {
    }

    @Post()
    @Roles("admin", "user")
    create(@Body() userDto: CreateRoleDto) {
        return this.roleService.createRole(userDto)
    }

    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value)
    }

}
