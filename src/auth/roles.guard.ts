import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus, Inject,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {ROLES_KEY} from "./roles-auth.decorator";
import {Reflector} from "@nestjs/core";

export interface AuthGuardConfig {
    disabled?: boolean;
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(@Inject(JwtService) private jwtService: JwtService, private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride<string[], string>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            // if (!requiredRoles) {
            //     return true
            // }

            const access_token = request.cookies['access_token']

            console.log('access_token', access_token, !access_token)

            if (!access_token) {
                throw new UnauthorizedException({
                    message: 'Пользователь не авторизован'
                })
            }

            const user = this.jwtService.verify(access_token)
            console.log('user', user)
            request.user = user

            const hasRole: boolean = user.roles.some(role => requiredRoles.includes(role.value))
            console.log('hasRole', hasRole)

            if (hasRole) {
                return hasRole
            }
            else {
                throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
            }
        }
        catch (error) {
            console.log('RolesGuard - error', error)
            throw new HttpException(error.message, error.status)
        }
    }
}