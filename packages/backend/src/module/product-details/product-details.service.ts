import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProductDetailsRepository} from './repository/product-details.repository';
import {
	CreateProductDetailsDto,
	UpdateProductDetailsDto,
} from './dto/product-details.dto';
import {ProductDetails} from './entity/product-details.entity';

@Injectable()
export class ProductDetailsService {
	constructor(
		@InjectRepository(ProductDetailsRepository)
		private productDetailsRepository: ProductDetailsRepository
	) {}

	async getAllProductDetailss(): Promise<any> {
		try {
			return await this.productDetailsRepository.getAllProductDetailss();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getProductDetailsDetails(id: number): Promise<ProductDetails | any> {
		try {
			const result = await this.productDetailsRepository.findOne({id});
			if (!result)
				throw new NotFoundException('ProductDetails Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createProductDetails(
		createProductDetailsDto: CreateProductDetailsDto
	): Promise<ProductDetails> {
		try {
			return await this.productDetailsRepository.save(createProductDetailsDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateProductDetails(
		id: number,
		updateProductDetailsDto: UpdateProductDetailsDto
	): Promise<ProductDetails> {
		try {
			const result = await this.productDetailsRepository.updateProductDetails(
				id,
				updateProductDetailsDto
			);
			if (!result)
				throw new NotFoundException('ProductDetails Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeProductDetails(id: number): Promise<any> {
		try {
			const result = await this.productDetailsRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted ProductDetails Id ' + id + ' successfully !';
			throw new NotFoundException('ProductDetails Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
