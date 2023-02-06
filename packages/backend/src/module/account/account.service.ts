import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AccountRepository} from './repository/account.repository';
import {CreateAccountDto, UpdateAccountDto} from './dto/account.dto';
import {Account} from './entity/account.entity';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(AccountRepository)
		private accountRepository: AccountRepository
	) {}

	async getAllAccounts(): Promise<any> {
		try {
			return await this.accountRepository.getAllAccounts();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getAccountDetails(id: number): Promise<Account | any> {
		try {
			const result = await this.accountRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Account Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
		try {
			return await this.accountRepository.save(createAccountDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAccount(
		id: number,
		updateAccountDto: UpdateAccountDto
	): Promise<Account | any> {
		try {
			const result = await this.accountRepository.updateAccount(
				id,
				updateAccountDto
			);
			if (!result)
				throw new NotFoundException('Account Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAccount(id: number): Promise<any> {
		try {
			const result = await this.accountRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted account Id ' + id + ' successfully !';
			throw new NotFoundException('Account Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
