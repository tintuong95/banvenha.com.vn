import {
	Controller,
	Request,
	Post,
	UseGuards,
	Get,
	Body,
	ForbiddenException,
} from '@nestjs/common';
import {SignInDto, SignUpDto} from '~module/verified/dto/verified.dto';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';

@Controller('auth')
export class AppController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() signInDto: SignInDto) {
		return this.authService.signInVerified(signInDto);
	}

	@Post('signup')
	async signup(@Body() signUpDto: SignUpDto) {
		return this.authService.signUpVerified(signUpDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		if (!req.user) throw new ForbiddenException('Forbidden !');
		return this.authService.getProfile(req.user.id);
	}
}
