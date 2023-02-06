import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreatePartnerDto, UpdatePartnerDto} from './dto/partner.dto';
import {Partner} from './entity/partner.entity';
import {Repository} from 'typeorm';
import _ from 'lodash';
@Injectable()
export class PartnerService {
	constructor(
		@InjectRepository(Partner)
		private partnerRepository: Repository<Partner>
	) {}

	async getAllPartners(): Promise<any> {
		try {
			return await this.partnerRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getPartnerDetails(id: number): Promise<Partner | any> {
		try {
			const result = await this.partnerRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Partner Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createPartner(createPartnerDto: CreatePartnerDto): Promise<Partner> {
		try {
			return await this.partnerRepository.save(createPartnerDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updatePartner(
		id: number,
		updatePartnerDto: UpdatePartnerDto
	): Promise<Partner> {
		try {
			const result = await this.partnerRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Partner Id ' + id + ' Not Found !');
			_(updatePartnerDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.partnerRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removePartner(id: number): Promise<any> {
		try {
			const result = await this.partnerRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted Partner Id ' + id + ' successfully !';
			throw new NotFoundException('Partner Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
