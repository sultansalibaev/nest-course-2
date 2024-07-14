import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UsersModule} from "src/entities/users/users.module";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            global: true,
            secret: process.env.SECRET_KEY || "SECRET_KEY_123456789",
            signOptions: {
                expiresIn: '2h'
            }
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [
        AuthService,
        JwtModule
    ]
})
export class AuthModule {}
