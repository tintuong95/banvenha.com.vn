import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
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
		return await this.productGroupRepository.find();
	}

	async getProductGroupDetails(id: number): Promise<ProductGroup | any> {
		const result = await this.productGroupRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
		return result;
	}

	async createProductGroup(
		createProductGroupDto: CreateProductGroupDto
	): Promise<ProductGroup> {
		return await this.productGroupRepository.save(createProductGroupDto);
	}

	async updateProductGroup(
		id: number,
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

	async removeProductGroup(id: number): Promise<string> {
		const result = await this.productGroupRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductGroup Id ' + id + ' successfully !';
		throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
	}

	async deleteProductGroup(id: number): Promise<string> {
		const result = await this.productGroupRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductGroup Id ' + id + ' successfully !';
		throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
	}

	async restoreProductGroup(id: number): Promise<string> {
		const result = await this.productGroupRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductGroup Id ' + id + ' successfully !';
		throw new NotFoundException('ProductGroup Id ' + id + ' Not Found !');
	}
}
