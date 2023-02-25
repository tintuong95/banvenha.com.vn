import {Injectable} from '@nestjs/common';

import {JwtService} from '@nestjs/jwt';
import {VerifiedService} from '~module/verified/verified.service';
import {
	CreateVerifiedDto,
	SignInVerifiedDto,
} from '~module/verified/dto/verified.dto';
import {AdminChildService} from '~module/admin/auth/admin.auth.service';

@Injectable()
export class AuthService {
	constructor(
		private verifiedService: VerifiedService,
		private jwtService: JwtService,
		private adminChildService: AdminChildService
	) {}

	async signInVerified(signInVerifiedDto: SignInVerifiedDto) {
		const {admin} = await this.verifiedService.signIn(signInVerifiedDto);
		const accessToken = this.jwtService.sign({
			id: admin.id,
			name: admin.name,
			role: admin.role,
		});
		return {
			self: admin,
			accessToken: accessToken,
		};
	}

	async signUpVerified(createVerifiedDto: CreateVerifiedDto) {
		const {admin} = await this.verifiedService.signUp(createVerifiedDto);
		const accessToken = this.jwtService.sign({
			id: admin.id,
			name: admin.name,
			role: admin.role,
		});
		return {
			self: admin,
			accessToken: accessToken,
		};
	}

	async getProfile(id: number) {
		const admin = await this.adminChildService.getAdminDetails(id);
		const accessToken = this.jwtService.sign({
			id: admin.id,
			name: admin.name,
			role: admin.role,
		});
		return {
			self: admin,
			accessToken: accessToken,
		};
	}
}
