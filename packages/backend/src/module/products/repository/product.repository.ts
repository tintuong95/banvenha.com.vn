/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateProductDto} from '../dto/Product.dto';
import {Product} from '../entity/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
	async updateProduct(
		id: number,
		updateProductDto: UpdateProductDto
	): Promise<Product | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateProductDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllProducts(): Promise<Product[]> {
		return await this.find();
	}
}
