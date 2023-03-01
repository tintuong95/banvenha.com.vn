import {Module} from '@nestjs/common';
import {VerifiedService} from './verified.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Verified} from './entity/verified.entity';
import {AccountChildModule} from '~module/account/auth/account.auth.module';

@Module({
	providers: [VerifiedService],
	imports: [TypeOrmModule.forFeature([Verified]), AccountChildModule],
	exports: [TypeOrmModule, VerifiedService],
})
export class VerifiedModule {}
