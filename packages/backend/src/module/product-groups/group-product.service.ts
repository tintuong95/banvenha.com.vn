import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductGroupDto,
	UpdateProductGroupDto,
} from './dto/product-group.dto';
import {ProductGroup} from './entity/product-group.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class ProductGroupService {
	constructor(
		@InjectRepository(ProductGroup)
		private productGroupRepository: Repository<ProductGroup>
	) {}

	async getAllProductGroups(): Promise<any> {
		try {
			return await this.productGroupRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getProductGroupDetails(id: number): Promise<ProductGroup | any> {
		try {
			const result = await this.productGroupRepository.findOne({id});
			if (!result)
				throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createProductGroup(
		createProductGroupDto: CreateProductGroupDto
	): Promise<ProductGroup> {
		try {
			return await this.productGroupRepository.save(createProductGroupDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateProductGroup(
		id: number,
		updateProductGroupDto: UpdateProductGroupDto
	): Promise<ProductGroup> {
		try {
			const result = await this.productGroupRepository.findOne({id});
			if (!result)
				throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');

			_(updateProductGroupDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.productGroupRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeProductGroup(id: number): Promise<any> {
		try {
			const result = await this.productGroupRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted ProductGroup Id ' + id + ' successfully !';
			throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
