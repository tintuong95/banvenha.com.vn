import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ACCOUNT_RELATION} from '~contants/relation';
import {Account} from '../entity/account.entity';
import {CreateAccountDto, UpdateAccountDto} from '../dto/account.dto';

@Injectable()
export class AccountChildService {
	constructor(
		@InjectRepository(Account)
		private accountRepository: Repository<Account>
	) {}

	async getAccountDetails(id: string): Promise<Account | any> {
		const result = await this.accountRepository.findOne({
			where: {id},
		});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');

		return result;
	}

	async createAccount(createAccountDto: CreateAccountDto): Promise<Account> {
		const result = this.accountRepository.create(createAccountDto);
		return await this.accountRepository.save(result);
	}

	async updateAccount(
		id: string,
		updateAccountDto: UpdateAccountDto
	): Promise<Account> {
		const result = await this.accountRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');
		_(updateAccountDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.accountRepository.save(result);
	}
}
