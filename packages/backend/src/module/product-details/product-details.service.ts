import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductDetailsDto,
	UpdateProductDetailsDto,
} from './dto/product-details.dto';
import {ProductDetails} from './entity/product-details.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class ProductDetailsService {
	constructor(
		@InjectRepository(ProductDetails)
		private productDetailsRepository: Repository<ProductDetails>
	) {}

	async getAllProductDetailss(): Promise<any> {
		return await this.productDetailsRepository.find();
	}

	async getProductDetailsDetails(id: number): Promise<ProductDetails | any> {
		const result = await this.productDetailsRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductDetails Id ' + id + ' Not Found !');
		return result;
	}

	async createProductDetails(
		createProductDetailsDto: CreateProductDetailsDto
	): Promise<ProductDetails> {
		return await this.productDetailsRepository.save(createProductDetailsDto);
	}

	async updateProductDetails(
		id: number,
		updateProductDetailsDto: UpdateProductDetailsDto
	): Promise<ProductDetails> {
		const result = await this.productDetailsRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductDetails Id ' + id + ' Not Found !');

		_(updateProductDetailsDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productDetailsRepository.save(result);
	}

	async removeProductDetails(id: number): Promise<any> {
		const result = await this.productDetailsRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductDetails Id ' + id + ' successfully !';
		throw new NotFoundException('ProductDetails Id ' + id + ' Not Found !');
	}
}
