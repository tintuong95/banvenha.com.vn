/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateProductImagesDto} from '../dto/product-images.dto';
import {ProductImages} from '../entity/product-images.entity';

@EntityRepository(ProductImages)
export class ProductImagesRepository extends Repository<ProductImages> {
	async updateProductImages(
		id: number,
		updateProductImagesDto: UpdateProductImagesDto
	): Promise<ProductImages | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateProductImagesDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllProductImagess(): Promise<ProductImages[]> {
		return await this.find();
	}
}
