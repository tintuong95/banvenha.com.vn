import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	ValidationPipe,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import {ProductFilesService} from './product-files.service';
import {
	CreateProductFilesDto,
	UpdateProductFilesDto,
} from './dto/product-files.dto';
import {ProductFiles} from './entity/product-files.entity';

@Controller('product-files')
export class ProductFilesController {
	constructor(private productFilesService: ProductFilesService) {}
	@Get('')
	async getAllProductFiless(): Promise<any> {
		return await this.productFilesService.getAllProductFiless();
	}
	@Get(':id')
	async getProductFilesDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductFiles> {
		return await this.productFilesService.getProductFilesDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createProductFiles(
		@Body() createProductFilesDto: CreateProductFilesDto
	): Promise<ProductFiles> {
		return await this.productFilesService.createProductFiles(
			createProductFilesDto
		);
	}

	@Put(':id')
	async updateProductFiles(
		@Body(ValidationPipe) updateProductFilesDto: UpdateProductFilesDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductFiles> {
		return await this.productFilesService.updateProductFiles(
			id,
			updateProductFilesDto
		);
	}

	@Delete(':id')
	async removeProductFiles(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productFilesService.removeProductFiles(id);
	}
}
