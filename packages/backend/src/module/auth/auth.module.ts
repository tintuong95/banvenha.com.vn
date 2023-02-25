import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt/dist';
import {PassportModule} from '@nestjs/passport';
import {AdminChildModule} from '~module/admin/auth/admin.auth.module';
import {VerifiedModule} from '~module/verified/verified.module';
import {AppController} from './auth.controller';

import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';

@Module({
	imports: [
		VerifiedModule,
		PassportModule,
		AdminChildModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get<string>('jwt.secret_key'),
					signOptions: {
						expiresIn: configService.get<number>('jwt.expiration_time'),
					},
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, JwtStrategy],
	exports: [AuthService],
	controllers: [AppController],
})
export class AuthModule {}
