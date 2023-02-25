import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ACCOUNT_KEY} from '~contants/relation';
import {Account} from '../entity/account.entity';

@Injectable()
export class AccountChildService {
	constructor(
		@InjectRepository(Account)
		private adminRepository: Repository<Account>
	) {}

	async getAccountDetails(id: string): Promise<Account | any> {
		const result = await this.adminRepository.findOne({
			where: {id},
			relations: [ACCOUNT_KEY],
		});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');

		return result;
	}
}
