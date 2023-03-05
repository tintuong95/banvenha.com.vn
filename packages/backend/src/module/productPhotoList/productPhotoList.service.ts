import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ProductPhotoList} from './entity/productPhotoList.entity';
import {
	CreateproductPhotoListDto,
	UpdateproductPhotoListDto,
} from './dto/productPhotoList.dto';

@Injectable()
export class ProductPhotoListService {
	constructor(
		@InjectRepository(ProductPhotoList)
		private productGroupRepository: Repository<ProductPhotoList>
	) {}

	async getAllProductPhotoLists(): Promise<any> {
		return await this.productGroupRepository.find();
	}

	async getProductPhotoListDetails(
		id: string
	): Promise<ProductPhotoList | any> {
		const result = await this.productGroupRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductPhotoList Id ' + id + ' Not Found !');
		return result;
	}

	async createProductPhotoList(
		createProductPhotoListDto: CreateproductPhotoListDto[]
	): Promise<any> {
		const result = this.productGroupRepository.create(
			createProductPhotoListDto
		);
		return await this.productGroupRepository.save(result);
	}

	async updateProductPhotoList(
		id: string,
		updateProductPhotoListDto: UpdateproductPhotoListDto
	): Promise<ProductPhotoList> {
		const result = await this.productGroupRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('ProductPhotoList Id ' + id + ' Not Found !');

		_(updateProductPhotoListDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productGroupRepository.save(result);
	}

	async removeProductPhotoList(id: string): Promise<string> {
		const result = await this.productGroupRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductPhotoList Id ' + id + ' successfully !';
		throw new NotFoundException('ProductPhotoList Id ' + id + ' Not Found !');
	}

	async deleteProductPhotoList(id: string): Promise<string> {
		const result = await this.productGroupRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductPhotoList Id ' + id + ' successfully !';
		throw new NotFoundException('ProductPhotoList Id ' + id + ' Not Found !');
	}

	async restoreProductPhotoList(id: string): Promise<string> {
		const result = await this.productGroupRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductPhotoList Id ' + id + ' successfully !';
		throw new NotFoundException('ProductPhotoList Id ' + id + ' Not Found !');
	}
}
