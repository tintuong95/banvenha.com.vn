import {Module} from '@nestjs/common';
import {AccountController} from './account.controller';
import {AccountRepository} from './repository/account.repository';
import {AccountService} from './account.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
	controllers: [AccountController],
	providers: [AccountService],
	imports: [TypeOrmModule.forFeature([AccountRepository])],
	exports: [TypeOrmModule],
})
export class AccountModule {}
