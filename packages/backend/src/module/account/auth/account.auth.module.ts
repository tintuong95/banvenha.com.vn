import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Account} from '../entity/account.entity';
import {AccountChildService} from './account.auth.service';

@Module({
	providers: [AccountChildService],
	imports: [TypeOrmModule.forFeature([Account])],
	exports: [TypeOrmModule, AccountChildService],
})
export class AccountChildModule {}
