import {Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Account} from './entity/account.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ACCOUNT_RELATION} from '~contants/relation';
import {Request} from 'express';
import {UserDto} from '~shared/user.dto';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {ROLE} from '~contants/role';
import {UpdateAccountDto} from './dto/account.dto';

@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private accountRepository: Repository<Account>
	) {}

	async getAllAccounts(
		request: Request,
		query: any,
		user: UserDto
	): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const result = await this.accountRepository.findAndCount({
			where: findOptionWhere(query, ['name']),
			// relations: [ADMIN_RELATION, NEWS_GROUP_RELATION],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});
		return pagination(request, result, currentPage, perPage);
	}

	async getAccountDetails(id: string): Promise<Account | any> {
		const result = await this.accountRepository.findOne({
			where: {id},
		});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');

		return result;
	}

	async updateAccount(
		id: string,
		user: UserDto,
		updateAccountDto: UpdateAccountDto
	): Promise<Account> {
		const result = await this.accountRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Account Id ' + id + ' Not Found !');

		if (user.role !== ROLE.ADMIN) {
			delete updateAccountDto.role;
			delete updateAccountDto.status;
			delete updateAccountDto.point;
		}

		if (user.id === result.id || user.role === ROLE.ADMIN) {
			_(updateAccountDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
		} else {
			throw new UnauthorizedException();
		}

		return this.accountRepository.save(result);
	}

	async removeAccount(id: string): Promise<string | any> {
		const result = await this.accountRepository.softDelete(id);
		if (result.affected > 0)
			return 'Remove Account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}

	async restoreAccount(id: string): Promise<string | any> {
		const result = await this.accountRepository.restore(id);
		if (result.affected > 0)
			return 'Restore Account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}

	async deleteAccount(id: string): Promise<string | any> {
		const result = await this.accountRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Account Id ' + id + ' successfully !';
		throw new NotFoundException('Account Id ' + id + ' Not Found !');
	}
}
