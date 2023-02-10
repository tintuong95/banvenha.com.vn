import {Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AccountService} from '~module/account/account.service';
import {
	CreateAccountDto,
	SignInAccountDto,
} from '~module/account/dto/account.dto';

@Injectable()
export class AuthService {
	constructor(
		private accountService: AccountService,
		private jwtService: JwtService
	) {}

	async validateLogin(signInAccountDto: SignInAccountDto) {
		const {admin} = await this.accountService.signIn(signInAccountDto);
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

	async createAccount(createAccountDto: CreateAccountDto) {
		const {admin} = await this.accountService.signUp(createAccountDto);
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
