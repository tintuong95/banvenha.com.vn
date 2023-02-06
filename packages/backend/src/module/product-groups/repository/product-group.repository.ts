/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateProductGroupDto} from '../dto/product-group.dto';
import {ProductGroup} from '../entity/product-group.entity';

@EntityRepository(ProductGroup)
export class ProductGroupRepository extends Repository<ProductGroup> {
	async updateProductGroup(
		id: number,
		updateProductGroupDto: UpdateProductGroupDto
	): Promise<ProductGroup | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateProductGroupDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllProductGroups(): Promise<ProductGroup[]> {
		return await this.find();
	}
}
