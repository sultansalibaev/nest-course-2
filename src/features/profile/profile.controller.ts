import {Body, Controller, Get, Param, Put, Req, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "src/features/auth/roles-auth.decorator";
import {Profile, ProfileCreationAttrs} from "./profile.model";
import {RolesGuard} from "src/features/auth/roles.guard";
import {ProfileService} from "./profile.service";

@ApiTags('Профили')
@Controller('profile')
@UseGuards(RolesGuard)
@Roles("admin", "user")
export class ProfileController {
    constructor(private profileService: ProfileService) {
    }

    @ApiOperation({summary: 'Получить данные о своём пользователе'})
    @ApiResponse({status: 200, type: Profile})
    @UseGuards(RolesGuard)
    @Roles("admin", "user")
    @Get()
    async getProfile(@Req() request) {
        const user = request.user;

        return await this.profileService.getProfileData(user?.id)
    }

    @ApiOperation({summary: 'Получить данные о пользователе'})
    @ApiResponse({status: 200, type: Profile})
    @UseGuards(RolesGuard)
    @Roles("admin", "user")
    @Get(':id')
    async getUserProfile(@Param('id') id: number) {

        return await this.profileService.getProfileData(id)
    }

    @ApiOperation({summary: 'Обновить данные о своём пользователе'})
    @ApiResponse({status: 200, type: Profile})
    @UseGuards(RolesGuard)
    @Roles("admin", "user")
    @Put('update')
    async updateProfile(@Body() newProfile: ProfileCreationAttrs, @Req() request) {
        const user = request.user;

        return await this.profileService.updateProfileData(newProfile, user)
    }
}
