import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	ValidationPipe,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import {AccountService} from './account.service';
import {
	CreateAccountDto,
	SignInAccountDto,
	UpdateAccountDto,
} from './dto/account.dto';
import {Account} from './entity/account.entity';

@Controller('account')
export class AccountController {
	constructor(private accountService: AccountService) {}
	@Get('')
	async getAllAccounts(): Promise<any> {
		return await this.accountService.getAllAccounts();
	}
	@Get(':id')
	async getAccountDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Account> {
		return await this.accountService.getAccountDetails(id);
	}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signUp(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
		return await this.accountService.signUp(createAccountDto);
	}

	@Put(':id')
	async updateAccount(
		@Body(ValidationPipe) updateAccountDto: UpdateAccountDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Account> {
		return await this.accountService.updateAccount(id, updateAccountDto);
	}

	@Delete(':id')
	async removeAccount(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.accountService.removeAccount(id);
	}

	@Post('signin')
	async signIn(@Body() signInAccountDto: SignInAccountDto): Promise<any> {
		return await this.accountService.signIn(signInAccountDto);
	}
}
