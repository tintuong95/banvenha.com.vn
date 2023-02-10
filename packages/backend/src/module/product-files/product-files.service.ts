import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductFilesDto,
	UpdateProductFilesDto,
} from './dto/product-files.dto';
import {ProductFiles} from './entity/product-files.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {PRODUCT_KEY} from '~contants/relation';

@Injectable()
export class ProductFilesService {
	constructor(
		@InjectRepository(ProductFiles)
		private productFilesRepository: Repository<ProductFiles>
	) {}

	async getAllProductFiles(): Promise<any> {
		return await this.productFilesRepository.find();
	}

	async getProductFilesDetails(id: number): Promise<ProductFiles | any> {
		const result = await this.productFilesRepository.findOne({
			where: {id},
			relations: [PRODUCT_KEY],
		});
		if (!result)
			throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
		return result;
	}

	async createProductFiles(
		createProductFilesDto: CreateProductFilesDto
	): Promise<ProductFiles> {
		const result = await this.productFilesRepository.save(
			createProductFilesDto
		);
		return this.productFilesRepository.save(result);
	}

	async updateProductFiles(
		id: number,
		updateProductFilesDto: UpdateProductFilesDto
	): Promise<ProductFiles> {
		const result = await this.productFilesRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');

		_(updateProductFilesDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productFilesRepository.save(result);
	}

	async removeProductFiles(id: number): Promise<any> {
		const result = await this.productFilesRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductFiles Id ' + id + ' successfully !';
		throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
	}

	async restoreProductFiles(id: number): Promise<any> {
		const result = await this.productFilesRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductFiles Id ' + id + ' successfully !';
		throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
	}

	async deleteProductFiles(id: number): Promise<any> {
		const result = await this.productFilesRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductFiles Id ' + id + ' successfully !';
		throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
	}
}
