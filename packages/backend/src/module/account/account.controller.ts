import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	UseGuards,
	Query,
	Request,
} from '@nestjs/common';
import {Request as RequestExpress} from 'express';
import {ROLE} from '~contants/role';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {AccountService} from './account.service';
import {UpdateAccountDto} from './dto/account.dto';
import {Account} from './entity/account.entity';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
	constructor(private accountService: AccountService) {}

	@Get('list')
	@Roles(ROLE.ADMIN)
	async getAllAccounts(
		@Query() query: any,
		@Request() req: RequestExpress,
		@User() user: UserDto
	): Promise<any> {
		return await this.accountService.getAllAccounts(req, query, user);
	}
	@Get(':id/details')
	@Roles(ROLE.ADMIN)
	async getAccountDetails(@Param('id') id: string): Promise<Account> {
		return await this.accountService.getAccountDetails(id);
	}

	@Post(':id/update')
	@Roles(ROLE.ADMIN, ROLE.PARTNER)
	async updateAccount(
		@Body(ValidationPipe) updateAccountDto: UpdateAccountDto,
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Account> {
		return await this.accountService.updateAccount(id, user, updateAccountDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.ADMIN)
	async removeAccount(@Param('id') id: string): Promise<string> {
		return await this.accountService.removeAccount(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreAccount(@Param('id') id: string): Promise<string> {
		return await this.accountService.restoreAccount(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteAccount(@Param('id') id: string): Promise<string> {
		return await this.accountService.deleteAccount(id);
	}

	// @Post('signin')
	// async signIn(@Body() signInAccountDto: SignInAccountDto): Promise<any> {
	// 	return await this.accountService.signIn(signInAccountDto);
	// }
}
