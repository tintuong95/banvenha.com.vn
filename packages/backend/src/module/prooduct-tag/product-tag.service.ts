import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductTagsDto,
	UpdateProductTagsDto,
} from './dto/product-tag.dto';
import {ProductTags} from './entity/product-tag.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {
	ADMIN_KEY,
	PARTNER_KEY,
	RECEIVER_KEY,
	SENDER_KEY,
} from '~contants/relation';
import {UserDto} from '~shared/user.dto';
import {Request} from 'express';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {ROLE} from '~contants/role';

@Injectable()
export class ProductTagsService {
	constructor(
		@InjectRepository(ProductTags)
		private productTagsRepository: Repository<ProductTags>
	) {}

	// async getAllProductTags(
	// 	request: Request,
	// 	query: any,
	// 	user: UserDto
	// ): Promise<any> {
	// 	const {skip, take, currentPage, perPage} = handleQuery(query);
	// 	const newQuery = findOptionWhere(query, ['name']);

	// 	const isPartner = user.role === ROLE.PARTNER;

	// 	if (isPartner) newQuery['receiver_id'] = user.id;
	// 	const result = await this.productTagsRepository.findAndCount({
	// 		where: newQuery,
	// 		relations: [RECEIVER_KEY, SENDER_KEY],
	// 		take,
	// 		skip,
	// 		withDeleted: user.role === ROLE.ADMIN,
	// 	});
	// 	return pagination(request, result, currentPage, perPage);
	// }

	async getProductTagsDetails(id: number): Promise<ProductTags | any> {
		const result = await this.productTagsRepository.findOne({
			where: {id},
			relations: [PARTNER_KEY, ADMIN_KEY],
		});
		if (!result)
			throw new NotFoundException('ProductTags Id ' + id + ' Not Found !');
		return result;
	}

	// async createProductTags(
	// 	createProductTagsDto: CreateProductTagsDto
	// ): Promise<ProductTags> {
	// 	const result = await this.productTagsRepository.save(createProductTagsDto);
	// 	return await this.productTagsRepository.save(result);
	// }

	// async updateProductTags(
	// 	id: number,
	// 	updateProductTagsDto: UpdateProductTagsDto
	// ): Promise<ProductTags> {
	// 	const result = await this.productTagsRepository.findOne({where: {id}});
	// 	if (!result)
	// 		throw new NotFoundException('ProductTags Id ' + id + ' Not Found !');
	// 	_(updateProductTagsDto).forEach((val, key) => {
	// 		if (val) result[key] = val;
	// 	});
	// 	return this.productTagsRepository.save(result);
	// }

	async removeProductTags(id: number): Promise<any> {
		const result = await this.productTagsRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed ProductTags Id ' + id + ' successfully !';
		throw new NotFoundException('ProductTags Id ' + id + ' Not Found !');
	}

	async deleteProductTags(id: number): Promise<any> {
		const result = await this.productTagsRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted ProductTags Id ' + id + ' successfully !';
		throw new NotFoundException('ProductTags Id ' + id + ' Not Found !');
	}

	async restoreProductTags(id: number): Promise<any> {
		const result = await this.productTagsRepository.restore(id);
		if (result.affected > 0)
			return 'Restored ProductTags Id ' + id + ' successfully !';
		throw new NotFoundException('ProductTags Id ' + id + ' Not Found !');
	}
}
