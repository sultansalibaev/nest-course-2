import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "src/entities/users/users.service";
import {Profile, ProfileCreationAttrs} from "./profile.model";
import {User} from "src/entities/users/users.model";
import { excludeParams } from 'src/shared/common/utils';

@Injectable()
export class ProfileService {

    constructor(
        @InjectModel(Profile) private profileRepository: typeof Profile,
        private userService: UsersService,
    ) {}

    async getProfileData(userId: number) {
        const profile = await this.profileRepository.findOne({
            where: { userId: userId },
            include: [
                {
                    model: User,
                    attributes: ['email', 'username', 'phone'],
                },
            ],
        })

        const profileData = profile.get({ plain: true })

        return excludeParams(
            ['id', 'userId', 'createdAt', 'updatedAt', 'user'],
            profileData,
            profileData?.user
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
