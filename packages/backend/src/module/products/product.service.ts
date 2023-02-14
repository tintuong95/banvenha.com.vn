import {Injectable} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductAllFieldDto,
	CreateProductDto,
	UpdateProductDto,
} from './dto/product.dto';
import {Product} from './entity/product.entity';
import * as _ from 'lodash';
import {Repository} from 'typeorm';
import {
	ADMIN_KEY,
	GROUP_PRODUCT_KEY,
	PARTNER_KEY,
	PRODUCT_DETAIL_KEY,
	PRODUCT_FILE_KEY,
} from '~contants/relation';
import {ProductFilesService} from '~module/product-files/product-files.service';
import {ProductImagesService} from '~module/product-images/product-images.service';
import {ProductDetailsService} from '~module/product-details/product-details.service';
import {Express} from 'express';
import {plainToInstance} from 'class-transformer';
import {CreateProductDetailsDto} from '~module/product-details/dto/product-details.dto';
import {handleQuery, pagination} from '~util/pagination';
import {findOptionWhere} from '~util/query';
import {Request} from 'express';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {ROLE} from '~contants/role';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private productRepository: Repository<Product>,
		private productFileService: ProductFilesService,
		private productImageService: ProductImagesService,
		private productDetailService: ProductDetailsService
	) {}

	async getAllProducts(
		request: Request,
		query: any,
		@User() user: UserDto
	): Promise<any> {
		const {skip, take, currentPage, perPage} = handleQuery(query);

		const newQuery = findOptionWhere(query, ['name']);

		const isPartner = user.role === ROLE.PARTNER;

		if (isPartner) newQuery['creator_id'] = user.id;

		const result = await this.productRepository.findAndCount({
			where: newQuery,
			relations: [ADMIN_KEY, GROUP_PRODUCT_KEY],
			take,
			skip,
			withDeleted: user.role === ROLE.ADMIN,
		});

		return pagination(request, result, currentPage, perPage);
	}

	async getProductDetails(id: number): Promise<Product | any> {
		const result = await this.productRepository.findOne({
			where: {id},
			relations: [ADMIN_KEY, PRODUCT_DETAIL_KEY],
		});
		if (!result)
			throw new NotFoundException('Product Id ' + id + ' Not Found !');
		return result;
	}

	async createProduct(
		productAllField: CreateProductAllFieldDto,
		image: Express.Multer.File,
		images: Express.Multer.File[],
		creator_id: number
	): Promise<Product | any> {
		const product = plainToInstance(CreateProductDto, productAllField, {
			excludeExtraneousValues: true,
		});

		product.image = image[0].filename;
		product.creator_id = creator_id;
		const result = this.productRepository.create(product);
		const newProduct = await this.productRepository.save(result);

		const productDetails = plainToInstance(
			CreateProductDetailsDto,
			productAllField,
			{
				excludeExtraneousValues: true,
			}
		);
		await this.productDetailService.createProductDetails({
			...productDetails,
			product_id: newProduct.id,
		});

		// await this.productFileService.createProductFiles({
		// 	...file,
		// 	product_id: 1,
		// });

		const newListImages = images.map((item) => ({
			product_id: newProduct.id,
			name: item.filename,
			param: item.filename,
			path: item.filename,
		}));
		const listImage = await this.productImageService.createProductImages(
			newListImages
		);
		// console.log(listImage);
		return await this.getProductDetails(newProduct.id);
	}

	async updateProduct(
		id: number,
		updateProductDto: UpdateProductDto
	): Promise<Product> {
		const result = await this.productRepository.findOne({where: {id}});
		if (!result)
			throw new NotFoundException('Product Id ' + id + ' Not Found !');

		_(updateProductDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.productRepository.save(result);
	}

	async removeProduct(id: number): Promise<any> {
		const result = await this.productRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async restoreProduct(id: number): Promise<any> {
		const result = await this.productRepository.restore(id);
		if (result.affected > 0)
			return 'Restored Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async deleteProduct(id: number): Promise<any> {
		const result = await this.productRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted Product Id ' + id + ' successfully !';
		throw new NotFoundException('Product Id ' + id + ' Not Found !');
	}

	async updateStatusByAdmin(
		id: number,
		statusDto: UpdateProductDto
	): Promise<any> {
		const {status = 0} = statusDto;
		const result = await this.productRepository.findOne({where: {id}});
		if (!result) throw new NotFoundException('News Id ' + id + ' Not Found !');
		result.status = status;
		return this.productRepository.save(result);
	}
}
