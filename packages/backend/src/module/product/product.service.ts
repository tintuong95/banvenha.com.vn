import {ForbiddenException, Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CreateProductDto, UpdateProductDto} from './dto/product.dto';
import {Product} from './entity/product.entity';
import * as _ from 'lodash';
import {Repository} from 'typeorm';
import {plainToInstance} from 'class-transformer';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {Request} from 'express';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {ROLE} from '~contants/role';
import {
	ACCOUNT_RELATION,
	PRODUCT_GROUP_RELATION,
	PRODUCT_PHOTO_LIST_RELATION,
} from '~contants/relation';
import {ProductPhotoListService} from '~module/productPhotoList/productPhotoList.service';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
		private productPhotoListService: ProductPhotoListService
	) {}

	async getAllProducts(
		request: Request,
		query: any,
		@User() user: UserDto
	): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const newQuery = findOptionWhere(query, ['title']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['creatorId'] = user.id;

		const result = await this.productRepository.findAndCount({
			where: newQuery,
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
			relations: [ACCOUNT_RELATION, PRODUCT_GROUP_RELATION],
		});

		return pagination(request, result, currentPage, perPage);
	}

	async getProductDetails(id: string): Promise<Product | any> {
		const result = await this.productRepository.findOne({
			where: {id},
			relations: [PRODUCT_PHOTO_LIST_RELATION, ACCOUNT_RELATION],
		});
		if (!result)
			throw new NotFoundException('Product Id ' + id + ' Not Found !');
		return result;
	}

	async getProductSlugDetails(slug: string): Promise<Product | any> {
		const result = await this.productRepository.findOne({
			where: {slug: slug},
			relations: [PRODUCT_PHOTO_LIST_RELATION, ACCOUNT_RELATION],
		});
		if (!result)
			throw new NotFoundException('Product params ' + slug + ' Not Found !');
		return result;
	}

	async createProduct(
		createProductDto: CreateProductDto,
		photo: Express.Multer.File,
		photoList: Express.Multer.File[],
		creatorId: string
	): Promise<Product | any> {
		const product = plainToInstance(CreateProductDto, createProductDto, {
			excludeExtraneousValues: true,
		});
		product.creatorId = creatorId;
		if (photo) {
			product.photo = photo.filename;
		}
		const result = this.productRepository.create(product);
		const newProduct = await this.productRepository.save(result);

		const newPhotoList = photoList.map((item) => ({
			productId: newProduct.id,
			path: item.filename,
		}));

		await this.productPhotoListService.createProductPhotoList(newPhotoList);

		// const createFile = await this.productFileService.createProductFiles({
		// 	product_id: newProduct.id,
		// 	path: file[0].filename,
		// 	type: file[0].mimetype,
		// });

		return newProduct;
	}
	async updateProduct(
		id: string,
		updateProductDto: UpdateProductDto,
		files: {
			photo?: Express.Multer.File;
			photoList?: Express.Multer.File[];
		},
		creatorId: string
	): Promise<Product> {
		const result = await this.productRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Product Id ' + id + ' Not Found !');

		if (result.creatorId !== creatorId)
			throw new ForbiddenException('Forbidden !');
		_(updateProductDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		if (files?.photo) {
			result.photo = files.photo[0].filename;
		}
		if (files?.photoList) {
			const newPhotoList = files.photoList.map((item) => ({
				productId: result.id,
				path: item.filename,
			}));
			await this.productPhotoListService.createProductPhotoList(newPhotoList);
		}
		// if (file) {
		// 	const createFile = await this.productFileService.createProductFiles({
		// 		product_id: result.id,
		// 		path: file[0].filename,
		// 		type: file[0].mimetype,
		// 	});
		// }
		return this.productRepository.save(result);
	}

	async removeProduct(id: string): Promise<any> {
		const result = await this.productRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async restoreProduct(id: string): Promise<any> {
		const result = await this.productRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async deleteProduct(id: string): Promise<any> {
		const result = await this.productRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async updateStatusByAdmin(
		id: string,
		statusDto: UpdateProductDto
	): Promise<any> {
		const {status = 0} = statusDto;
		const result = await this.productRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Product Id ' + id + ' Not Found !');
		result.status = status;
		return this.productRepository.save(result);
	}

	async countProduct(user: UserDto): Promise<any> {
		const options = {};
		if (user.role === ROLE.PARTNER) {
			options['creatorId'] = user.id;
		}
		const result = await this.productRepository.count({
			where: options,
		});
		if (!result)
			throw new NotFoundException('Count ' + user.id + ' Not Found !');
		return {count: result};
	}

	async viewsLikeTotal(user: UserDto): Promise<any> {
		if (user.role === ROLE.PARTNER) {
			return await this.productRepository
				.createQueryBuilder('products')
				.where('products.creatorId=:creatorId', {creatorId: user.id})
				.select('SUM(products.views)', 'views')
				.addSelect('SUM(products.likes)', 'likes')
				.getRawOne();
		} else {
			return await this.productRepository
				.createQueryBuilder('products')
				.select('SUM(products.views)', 'views')
				.addSelect('SUM(products.likes)', 'likes')
				.getRawOne();
		}
	}
}
