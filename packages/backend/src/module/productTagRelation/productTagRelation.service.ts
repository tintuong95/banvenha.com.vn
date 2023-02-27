import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';

import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ProductTagRelation} from './entity/productTagRelation.entity';
import {
	CreateProductTagRelationDto,
	UpdateProductTagRelationDto,
} from './dto/productTagRelation.dto';

@Injectable()
export class ProductTagRelationService {
	constructor(
		@InjectRepository(ProductTagRelation)
		private productTagRelationRepository: Repository<ProductTagRelation>
	) {}

	async getAllProductTagRelations(): Promise<any> {
		return await this.productTagRelationRepository.find();
	}

	async getProductTagRelationDetails(
		id: string
	): Promise<ProductTagRelation | any> {
		const result = await this.productTagRelationRepository.findOne({
			where: {id},
		});
		if (!result)
			throw new NotFoundException(
				'ProductTagRelation Id ' + id + ' Not Found !'
			);
		return result;
	}

	async createProductTagRelation(
		createProductTagRelationDto: CreateProductTagRelationDto
	): Promise<ProductTagRelation> {
		const result = this.productTagRelationRepository.create(
			createProductTagRelationDto
		);
		return await this.productTagRelationRepository.save(result);
	}

	async updateProductTagRelation(
		id: string,
		updateProductTagRelationDto: UpdateProductTagRelationDto
	): Promise<ProductTagRelation> {
		const result = await this.productTagRelationRepository.findOne({
			where: {id},
		});
		if (!result)
			throw new NotFoundException(
				'ProductTagRelation Id ' + id + ' Not Found !'
			);

		_(updateProductTagRelationDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productTagRelationRepository.save(result);
	}

	async removeProductTagRelation(id: string): Promise<string> {
		const result = await this.productTagRelationRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductTagRelation Id ' + id + ' successfully !';
		throw new NotFoundException('ProductTagRelation Id ' + id + ' Not Found !');
	}

	async deleteProductTagRelation(id: string): Promise<string> {
		const result = await this.productTagRelationRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductTagRelation Id ' + id + ' successfully !';
		throw new NotFoundException('ProductTagRelation Id ' + id + ' Not Found !');
	}

	async restoreProductTagRelation(id: string): Promise<string> {
		const result = await this.productTagRelationRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductTagRelation Id ' + id + ' successfully !';
		throw new NotFoundException('ProductTagRelation Id ' + id + ' Not Found !');
	}
}
