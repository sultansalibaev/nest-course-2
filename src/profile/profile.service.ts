import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "../users/users.service";
import {Profile, ProfileCreationAttrs} from "./profile.model";
import {User} from "../users/users.model";
import { excludeParams } from 'src/shared/common/utils';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(Profile) private profileRepository: typeof Profile,
        private userService: UsersService,
    ) {}

    async getProfileData(user: User) {
        const profile = await this.profileRepository.findOne({
            where: { userId: user.id },
        })

        return excludeParams(
            ['id', 'userId', 'createdAt', 'updatedAt'],
            profile.dataValues,
            { email: user.email }
        );
    }

    async updateProfileData(newProfile: ProfileCreationAttrs, user: User) {
        const profile = await this.profileRepository.findOne({
            where: { userId: user.id }
        })

        Object.entries(newProfile).forEach(([key, value]) => {
            profile[key] = value
        })

        profile.save()

        return excludeParams(
            ['id', 'userId', 'createdAt', 'updatedAt'],
            profile.dataValues,
            { email: user.email }
        );
    }
}
