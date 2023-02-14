import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ACCOUNT_KEY} from '~contants/relation';
import {Admin} from '../entity/admin.entity';

@Injectable()
export class AdminChildService {
	constructor(
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>
	) {}

	async getAdminDetails(id: number): Promise<Admin | any> {
		const result = await this.adminRepository.findOne({
			where: {id},
			relations: [ACCOUNT_KEY],
		});
		if (!result) throw new NotFoundException('Admin Id ' + id + ' Not Found !');

		return result;
	}
}
