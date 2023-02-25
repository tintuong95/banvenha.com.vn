import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AccountController} from './account.controller';
import {AccountService} from './account.service';

import {Account} from './entity/account.entity';

@Module({
	providers: [AccountService],
	imports: [TypeOrmModule.forFeature([Account])],
	exports: [TypeOrmModule],
	controllers: [AccountController],
})
export class AccountModule {}
