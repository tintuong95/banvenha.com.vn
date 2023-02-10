import {Module} from '@nestjs/common';
import {AccountService} from './account.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Account} from './entity/account.entity';
import {AccountController} from './account.controller';

@Module({
	controllers: [AccountController],
	providers: [AccountService],
	imports: [TypeOrmModule.forFeature([Account])],
	exports: [TypeOrmModule, AccountService],
})
export class AccountModule {}
