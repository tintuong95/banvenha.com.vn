import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProductDto, UpdateProductDto} from './dto/product.dto';
import {Product} from './entity/product.entity';
import _ from 'lodash';
import {Repository} from 'typeorm';
@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>
	) {}

	async getAllProducts(): Promise<any> {
		try {
			return await this.productRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getProductDetails(id: number): Promise<Product | any> {
		try {
			const result = await this.productRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Product Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createProduct(createProductDto: CreateProductDto): Promise<Product> {
		try {
			return await this.productRepository.save(createProductDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateProduct(
		id: number,
		updateProductDto: UpdateProductDto
	): Promise<Product> {
		try {
			const result = await this.productRepository.findOne({id});
			if (!result)
				throw new NotFoundException('Product Id ' + id + ' Not Found !');

			_(updateProductDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.productRepository.save(result);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeProduct(id: number): Promise<any> {
		try {
			const result = await this.productRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted Product Id ' + id + ' successfully !';
			throw new NotFoundException('Product Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
