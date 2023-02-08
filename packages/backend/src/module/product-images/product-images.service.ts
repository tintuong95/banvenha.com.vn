import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
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
		try {
			return await this.productImagesRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getProductImagesDetails(id: number): Promise<ProductImages | any> {
		try {
			const result = await this.productImagesRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('ProductImages Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createProductImages(
		createProductImagesDto: CreateProductImagesDto
	): Promise<ProductImages> {
		try {
			return await this.productImagesRepository.save(createProductImagesDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateProductImages(
		id: number,
		updateProductImagesDto: UpdateProductImagesDto
	): Promise<ProductImages> {
		try {
			const result = await this.productImagesRepository.findOne({where: {id}});
			if (!result) return null;

			_(updateProductImagesDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.productImagesRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeProductImages(id: number): Promise<any> {
		try {
			const result = await this.productImagesRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted ProductImages Id ' + id + ' successfully !';
			throw new NotFoundException('ProductImages Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
