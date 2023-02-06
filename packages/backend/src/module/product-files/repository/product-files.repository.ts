/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateProductFilesDto} from '../dto/product-files.dto';
import {ProductFiles} from '../entity/product-files.entity';

@EntityRepository(ProductFiles)
export class ProductFilesRepository extends Repository<ProductFiles> {
	async updateProductFiles(
		id: number,
		updateProductFilesDto: UpdateProductFilesDto
	): Promise<ProductFiles | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateProductFilesDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllProductFiless(): Promise<ProductFiles[]> {
		return await this.find();
	}
}
