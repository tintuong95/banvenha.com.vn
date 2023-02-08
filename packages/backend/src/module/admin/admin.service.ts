import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateAdminDto, UpdateAdminDto} from './dto/admin.dto';
import {Admin} from './entity/admin.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ACCOUNT_KEY} from '~contants/relation';

@Injectable()
export class AdminService {
	constructor(
		@InjectRepository(Admin)
		private adminRepository: Repository<Admin>
	) {}

	async getAllAdmins(): Promise<any> {
		try {
			return await this.adminRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getAdminDetails(id: number): Promise<Admin | any> {
		throw new NotFoundException('Admin Id ' + id + ' Not Found !');
		try {
			const result = await this.adminRepository.findOne({
				where: {id},
				relations: [ACCOUNT_KEY],
			});
			if (!result) return result;
		} catch (err) {
			console.log(err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
		try {
			return await this.adminRepository.save(createAdminDto);
		} catch (err) {
			console.log('err', err);
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateAdmin(
		id: number,
		updateAdminDto: UpdateAdminDto
	): Promise<Admin> {
		try {
			const result = await this.adminRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('Admin Id ' + id + ' Not Found !');
			_(updateAdminDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.adminRepository.save(result);
		} catch (err) {
			console.log(err);
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
