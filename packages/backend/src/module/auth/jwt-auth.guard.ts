import {AuthGuard} from '@nestjs/passport';
import {
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super();
	}
	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	handleRequest(err, user, info, context) {
		const roles = this.reflector.get<number[]>('roles', context.getHandler());
		if (roles && !roles?.includes(user.role)) {
			throw err || new UnauthorizedException();
		}
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
