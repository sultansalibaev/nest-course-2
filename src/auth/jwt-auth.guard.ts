import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const request = context.switchToHttp().getRequest()
            const access_token = request.cookies['access_token']

            if (!access_token) {
                throw new UnauthorizedException({
                    message: 'Пользователь не авторизован'
                })
            }

            const user = this.jwtService.verify(access_token)
            request.user = user

            return true
        }
        catch (e) {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован'
            })
        }
    }
}