import {forwardRef, Module} from '@nestjs/common';
import { UsersController } from 'src/entities/users/users.controller';
import { UsersService } from 'src/entities/users/users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "src/entities/users/users.model";
import {Role} from "src/entities/roles/roles.model";
import {UserRoles} from "src/entities/roles/user-roles.model";
import {RolesModule} from "src/entities/roles/roles.module";
import {AuthModule} from "src/features/auth/auth.module";
import {Article} from "src/entities/articles/articles.model";
import {Profile} from "src/features/profile/profile.model";

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
