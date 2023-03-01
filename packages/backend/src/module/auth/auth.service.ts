import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {VerifiedService} from '~module/verified/verified.service';
import {SignInDto, SignUpDto} from '~module/verified/dto/verified.dto';
import {AccountChildService} from '~module/account/auth/account.auth.service';

@Injectable()
export class AuthService {
	constructor(
		private verifiedService: VerifiedService,
		private jwtService: JwtService,
		private accountChildService: AccountChildService
	) {}

	async signInVerified(signInDto: SignInDto) {
		const {account} = await this.verifiedService.signIn(signInDto);
		const accessToken = this.jwtService.sign({
			id: account.id,
			name: account.fullName,
			role: account.role,
		});
		return {
			self: account,
			accessToken: accessToken,
		};
	}

	async signUpVerified(signUpDto: SignUpDto) {
		const {account} = await this.verifiedService.signUp(signUpDto);
		const accessToken = this.jwtService.sign({
			id: account.id,
			name: account.fullName,
			role: account.role,
		});
		return {
			self: account,
			accessToken: accessToken,
		};
	}

	async getProfile(id: string) {
		const account = await this.accountChildService.getAccountDetails(id);
		const accessToken = this.jwtService.sign({
			id: account.id,
			name: account.fullName,
			role: account.role,
		});
		return {
			self: account,
			accessToken: accessToken,
		};
	}
}
