import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {AdminRepository} from '././repository/admin.repository';
import {CreateAdminDto, UpdateAdminDto} from './dto/admin.dto';
import {Admin} from './entity/admin.entity';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(AdminRepository)
		private adminRepository: AdminRepository
	) {}

	async getAllAdmins(): Promise<any> {
		try {
			return await this.adminRepository.getAllAdmins();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getAdminDetails(id: number): Promise<Admin | any> {
		try {
			const result = await this.adminRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Admin Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
		try {
			return await this.adminRepository.save(createAdminDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAdmin(
		id: number,
		updateAdminDto: UpdateAdminDto
	): Promise<Admin> {
		try {
			const result = await this.adminRepository.updateAdmin(id, updateAdminDto);
			if (!result)
				throw new NotFoundException('Admin Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeAdmin(id: number): Promise<any> {
		try {
			const result = await this.adminRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted Admin Id ' + id + ' successfully !';
			throw new NotFoundException('Admin Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
