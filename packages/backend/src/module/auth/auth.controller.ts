import {
	Controller,
	Request,
	Post,
	UseGuards,
	Get,
	Body,
	ForbiddenException,
} from '@nestjs/common';
import {
	CreateVerifiedDto,
	SignInVerifiedDto,
} from '~module/verified/dto/verified.dto';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';

@Controller('auth')
export class AppController {
	constructor(private authService: AuthService) {}

	@Post('login')
	async login(@Body() signInVerifiedDto: SignInVerifiedDto) {
		return this.authService.signInVerified(signInVerifiedDto);
	}

	@Post('signup')
	async signup(@Body() createVerifiedDto: CreateVerifiedDto) {
		return this.authService.signUpVerified(createVerifiedDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req) {
		if (!req.user) throw new ForbiddenException('Forbidden !');
		return this.authService.getProfile(req.user.id);
	}
}
