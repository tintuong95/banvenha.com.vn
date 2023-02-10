import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateAdminDto, UpdateAdminDto} from './dto/admin.dto';
import {Admin} from './entity/admin.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>
	) {}

	// async getAllAdmins(): Promise<any> {
	// 	return await this.adminRepository.find();
	// }

	// async getAdminDetails(id: number): Promise<Admin | any> {
	// 	const result = await this.adminRepository.findOne({
	// 		where: {id},
	// 		relations: [ACCOUNT_KEY],
	// 	});
	// 	if (!result) throw new NotFoundException('Admin Id ' + id + ' Not Found !');

	// 	return result;
	// }

	async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
		const result = await this.adminRepository.create(createAdminDto);
		return await this.adminRepository.save(result);
	}

	async updateAdmin(
		id: number,
		updateAdminDto: UpdateAdminDto
	): Promise<Admin> {
		const result = await this.adminRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('Admin Id ' + id + ' Not Found !');
		_(updateAdminDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.adminRepository.save(result);
	}

	// async removeAdmin(id: number): Promise<any> {
	// 	const result = await this.adminRepository.delete(id);
	// 	if (result.affected > 0)
	// 		return 'Deleted Admin Id ' + id + ' successfully !';
	// 	throw new NotFoundException('Admin Id ' + id + ' Not Found !');
	// }
}
