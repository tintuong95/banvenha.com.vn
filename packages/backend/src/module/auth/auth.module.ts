import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt/dist';
import {PassportModule} from '@nestjs/passport';
import {AccountModule} from '~module/account/account.module';
import {AdminChildModule} from '~module/admin/auth/admin.auth.module';
import {AppController} from './auth.controller';

import {AuthService} from './auth.service';
import {JwtStrategy} from './jwt.strategy';

@Module({
	imports: [
		AccountModule,
		PassportModule,
		AdminChildModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				console.log(configService.get<string>('jwt.secret_key'));
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
