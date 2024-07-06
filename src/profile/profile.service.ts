import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "../users/users.service";
import {Profile, ProfileCreationAttrs} from "./profile.model";
import {User} from "../users/users.model";

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

        const only_params = [
            'id', 'userId', 'createdAt', 'updatedAt'
        ]

        let result = { email: user.email };

        this.getOnlyNotParams(only_params, profile.dataValues, result)

        return result
    }

    getOnlyParams(params, my_object) {
        return params.reduce((obj, param) => {
            if (typeof param === 'string') obj[param] = my_object[param]
            return obj
        }, {})
    }

    getOnlyNotParams(not_params, my_object, own_obj = null) {
        return Object.keys(my_object).reduce((obj, param) => {
            if (!not_params.includes(param)) {
                if (own_obj === null) {
                    obj[param] = my_object[param]
                }
                else {
                    own_obj[param] = my_object[param]
                }
            }
            return obj
        }, {})
    }

    async updateProfileData(newProfile: ProfileCreationAttrs, user: User) {
        const profile = await this.profileRepository.findOne({
            where: { userId: user.id }
        })

        Object.entries(newProfile).forEach(([key, value]) => {
            profile[key] = value
        })

        profile.save()

        return newProfile
    }
}
