import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import {ROLE} from '~contants/role';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {AccountService} from './account.service';
import {UpdateAccountDto} from './dto/account.dto';
import {Account} from './entity/account.entity';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
	constructor(private accountService: AccountService) {}

	@Get('list')
	@Roles(ROLE.ADMIN)
	async getAllAccounts(): Promise<any> {
		return await this.accountService.getAllAccounts();
	}
	@Get(':id/details')
	@Roles(ROLE.ADMIN)
	async getAccountDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Account> {
		return await this.accountService.getAccountDetails(id);
	}

	// @Post('signup')
	// @HttpCode(HttpStatus.CREATED)
	// async signUp(@Body() createAccountDto: CreateAccountDto): Promise<Account> {
	// 	return await this.accountService.signUp(createAccountDto);
	// }

	@Post(':id/update')
	@Roles(ROLE.ADMIN)
	async updateAccount(
		@Body(ValidationPipe) updateAccountDto: UpdateAccountDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Account> {
		return await this.accountService.updateAccount(id, updateAccountDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeAccount(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.accountService.removeAccount(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreAccount(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.accountService.restoreAccount(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteAccount(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.accountService.deleteAccount(id);
	}

	// @Post('signin')
	// async signIn(@Body() signInAccountDto: SignInAccountDto): Promise<any> {
	// 	return await this.accountService.signIn(signInAccountDto);
	// }
}
