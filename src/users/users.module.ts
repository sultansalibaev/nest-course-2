import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.model";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {RolesModule} from "../roles/roles.module";
import {AuthModule} from "../auth/auth.module";
import {Article} from "../articles/articles.model";
import {Profile} from "../profile/profile.model";

@Module({
    imports: [
        forwardRef(() => AuthModule),
        SequelizeModule.forFeature([User, Role, UserRoles, Article, Profile]),
        RolesModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
