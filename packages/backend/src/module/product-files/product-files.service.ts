import {HttpStatus, Injectable} from '@nestjs/common';
import {NotFoundException, HttpException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ProductFilesRepository} from './repository/product-files.repository';
import {
	CreateProductFilesDto,
	UpdateProductFilesDto,
} from './dto/product-files.dto';
import {ProductFiles} from './entity/product-files.entity';

@Injectable()
export class ProductFilesService {
	constructor(
		@InjectRepository(ProductFilesRepository)
		private productFilesRepository: ProductFilesRepository
	) {}

	async getAllProductFiless(): Promise<any> {
		try {
			return await this.productFilesRepository.getAllProductFiless();
		} catch (err) {
			throw new HttpException(err.sqlMessage, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async getProductFilesDetails(id: number): Promise<ProductFiles | any> {
		try {
			const result = await this.productFilesRepository.findOne({id});
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
			const result = await this.productFilesRepository.updateProductFiles(
				id,
				updateProductFilesDto
			);
			if (!result)
				throw new NotFoundException('ProductFiles Id ' + id + ' Not Found !');
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
