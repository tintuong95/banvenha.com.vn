/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateAccountDto} from '../dto/account.dto';
import {Account} from '../entity/account.entity';

@EntityRepository(Account)
export class AccountRepository extends Repository<Account> {
	async updateAccount(
		id: number,
		updateAccountDto: UpdateAccountDto
	): Promise<Account | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateAccountDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllAccounts(): Promise<Account[]> {
		return await this.find();
	}
}
