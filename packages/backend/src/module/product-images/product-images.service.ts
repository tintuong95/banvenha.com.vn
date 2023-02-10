import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductImagesDto,
	UpdateProductImagesDto,
} from './dto/product-images.dto';
import {ProductImages} from './entity/product-images.entity';
import * as _ from 'lodash';
import {Repository} from 'typeorm';
@Injectable()
export class ProductImagesService {
	constructor(
		@InjectRepository(ProductImages)
		private productImagesRepository: Repository<ProductImages>
	) {}

	async getAllProductImagess(): Promise<any> {
		return await this.productImagesRepository.find();
	}

	async getProductImagesDetails(id: number): Promise<ProductImages | any> {
		const result = await this.productImagesRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductImages Id ' + id + ' Not Found !');
		return result;
	}

	async createProductImages(
		createProductImagesDto: CreateProductImagesDto[]
	): Promise<ProductImages[]> {
		const results = this.productImagesRepository.create(createProductImagesDto);
		await this.productImagesRepository.insert(results);
		return results;
	}

	async updateProductImages(
		id: number,
		updateProductImagesDto: UpdateProductImagesDto
	): Promise<ProductImages> {
		const result = await this.productImagesRepository.findOne({where: {id}});
		if (!result) return null;

		_(updateProductImagesDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productImagesRepository.save(result);
	}

	async removeProductImages(id: number): Promise<any> {
		const result = await this.productImagesRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductImages Id ' + id + ' successfully !';
		throw new NotFoundException('ProductImages Id ' + id + ' Not Found !');
	}

	async deleteProductImages(id: number): Promise<any> {
		const result = await this.productImagesRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductImages Id ' + id + ' successfully !';
		throw new NotFoundException('ProductImages Id ' + id + ' Not Found !');
	}

	async restoreProductImages(id: number): Promise<any> {
		const result = await this.productImagesRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductImages Id ' + id + ' successfully !';
		throw new NotFoundException('ProductImages Id ' + id + ' Not Found !');
	}
}
