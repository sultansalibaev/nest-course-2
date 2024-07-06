import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import {UsersModule} from "../users/users.module";
import {ProfileController} from "./profile.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Profile} from "./profile.model";
import {User} from "../users/users.model";

@Module({
    providers: [ProfileService],
    controllers: [ProfileController],
    imports: [
        SequelizeModule.forFeature([User, Profile]),
        UsersModule
    ],
})
export class ProfileModule {}
