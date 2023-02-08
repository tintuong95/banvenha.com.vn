import {Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateAccountDto,
	SignInAccountDto,
	UpdateAccountDto,
} from './dto/account.dto';
import {Account} from './entity/account.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ADMIN_KEY} from '~contants/relation';
import {instanceToInstance, instanceToPlain} from 'class-transformer';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private accountRepository: Repository<Account>
	) {}

	async getAllAccounts(): Promise<any> {
		return await this.accountRepository.find();
	}

	async getAccountDetails(id: number): Promise<Account | any> {
		const result = await this.accountRepository.findOne({
			where: {id},
		});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');
		return result;
	}

	async signUp(createAccountDto: CreateAccountDto): Promise<Account> {
		const account = this.accountRepository.create(createAccountDto);
		const {email} = await this.accountRepository.save(account);
		const result = await this.accountRepository.findOne({
			where: {email},
			relations: [ADMIN_KEY],
		});
		return instanceToInstance(result);
	}

	async updateAccount(
		id: number,
		updateAccountDto: UpdateAccountDto
	): Promise<Account | any> {
		const result = await this.accountRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');

		_(updateAccountDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.accountRepository.save(result);
	}

	async removeAccount(id: number): Promise<any> {
		const result = await this.accountRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}

	async signIn(signInAccountDto: SignInAccountDto): Promise<any> {
		const {email, password} = signInAccountDto;
		const result = await this.accountRepository.findOne({
			where: {email},
			relations: [ADMIN_KEY],
		});

		if (!result)
			throw new NotFoundException('Account ' + email + ' Not Found !');
		else if (result && result.comparePassword(password)) {
			return instanceToPlain(result);
		}

		throw new UnauthorizedException('Password Wrong !');
	}
}
