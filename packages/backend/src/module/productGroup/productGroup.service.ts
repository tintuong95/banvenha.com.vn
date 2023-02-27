import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ProductGroup} from './entity/productGroup.entity';
import {
	CreateProductGroupDto,
	UpdateProductGroupDto,
} from './dto/productGroup.dto';

@Injectable()
export class ProductGroupService {
	constructor(
		@InjectRepository(ProductGroup)
		private productGroupRepository: Repository<ProductGroup>
	) {}

	async getAllProductGroups(): Promise<any> {
		return await this.productGroupRepository.find();
	}

	async getProductGroupDetails(id: string): Promise<ProductGroup | any> {
		const result = await this.productGroupRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
		return result;
	}

	async createProductGroup(
		createProductGroupDto: CreateProductGroupDto
	): Promise<ProductGroup> {
		const result = this.productGroupRepository.create(createProductGroupDto);
		return await this.productGroupRepository.save(result);
	}

	async updateProductGroup(
		id: string,
		updateProductGroupDto: UpdateProductGroupDto
	): Promise<ProductGroup> {
		const result = await this.productGroupRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');

		_(updateProductGroupDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productGroupRepository.save(result);
	}

	async removeProductGroup(id: string): Promise<string> {
		const result = await this.productGroupRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductGroup Id ' + id + ' successfully !';
		throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
	}

	async deleteProductGroup(id: string): Promise<string> {
		const result = await this.productGroupRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductGroup Id ' + id + ' successfully !';
		throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
	}

	async restoreProductGroup(id: string): Promise<string> {
		const result = await this.productGroupRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductGroup Id ' + id + ' successfully !';
		throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
	}
}
