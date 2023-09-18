import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ROLES_KEY} from "./roles-auth.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[], string>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if (!requiredRoles) {
                return true
            }

            const access_token = request.cookies['access_token']

            if (!access_token) {
                throw new UnauthorizedException({
                    message: 'Пользователь не авторизован'
                })
            }

            const user = this.jwtService.verify(access_token)
            request.user = user

            return user.roles.some(role => requiredRoles.includes(role.value))
        }
        catch (e) {
            throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
        }
    }
}