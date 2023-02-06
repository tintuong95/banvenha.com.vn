/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateAdminDto} from '../dto/admin.dto';
import {Admin} from '../entity/admin.entity';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
	async updateAdmin(
		id: number,
		updateAdminDto: UpdateAdminDto
	): Promise<Admin | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateAdminDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllAdmins(): Promise<Admin[]> {
		return await this.find();
	}
}
