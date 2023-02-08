/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateProductDetailsDto} from '../dto/product-details.dto';
import {ProductDetails} from '../entity/product-details.entity';

@EntityRepository(ProductDetails)
export class ProductDetailsRepository extends Repository<ProductDetails> {
	async updateProductDetails(
		id: number,
		updateProductDetailsDto: UpdateProductDetailsDto
	): Promise<ProductDetails | null> {
		const result = await this.findOne({where: {id}});
		if (!result) return null;

		_(updateProductDetailsDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllProductDetailss(): Promise<ProductDetails[]> {
		return await this.find();
	}
}
