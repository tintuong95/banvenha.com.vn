import {Controller, Request, Post, UseGuards, Get, Body} from '@nestjs/common';
import {
	CreateAccountDto,
	SignInAccountDto,
} from '~module/account/dto/account.dto';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';

@Controller('auth')
export class AppController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() signInAccountDto: SignInAccountDto) {
		return this.authService.validateLogin(signInAccountDto);
	}

	@Post('signup')
	async signup(@Body() createAccountDto: CreateAccountDto) {
		return this.authService.createAccount(createAccountDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		return req.user;
	}
}
