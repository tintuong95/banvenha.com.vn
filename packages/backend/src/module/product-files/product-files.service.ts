import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateProductFilesDto,
	UpdateProductFilesDto,
} from './dto/product-files.dto';
import {ProductFiles} from './entity/product-files.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {PRODUCT_KEY} from '~contants/relation';

@Injectable()
export class ProductFilesService {
	constructor(
		@InjectRepository(ProductFiles)
		private productFilesRepository: Repository<ProductFiles>
	) {}

	async getAllProductFiless(): Promise<any> {
		try {
			return await this.productFilesRepository.find();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getProductFilesDetails(id: number): Promise<ProductFiles | any> {
		try {
			const result = await this.productFilesRepository.findOne({
				where: {id},
				relations: [PRODUCT_KEY],
			});
			if (!result)
				throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async createProductFiles(
		createProductFilesDto: CreateProductFilesDto
	): Promise<ProductFiles> {
		try {
			return await this.productFilesRepository.save(createProductFilesDto);
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async updateProductFiles(
		id: number,
		updateProductFilesDto: UpdateProductFilesDto
	): Promise<ProductFiles> {
		try {
			const result = await this.productFilesRepository.findOne({where: {id}});
			if (!result)
				throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');

			_(updateProductFilesDto).forEach((val, key) => {
				if (val) result[key] = val;
			});
			return this.productFilesRepository.save(result);

			return result;
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async removeProductFiles(id: number): Promise<any> {
		try {
			const result = await this.productFilesRepository.delete(id);
			if (result.affected > 0)
				return 'Deleted ProductFiles Id ' + id + ' successfully !';
			throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
