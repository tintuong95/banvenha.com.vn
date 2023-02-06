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
import {ProductImagesService} from './product-images.service';
import {
	CreateProductImagesDto,
	UpdateProductImagesDto,
} from './dto/product-images.dto';
import {ProductImages} from './entity/product-images.entity';

@Controller('product-images')
export class ProductImagesController {
	constructor(private productImagesService: ProductImagesService) {}
	@Get('')
	async getAllProductImagess(): Promise<any> {
		return await this.productImagesService.getAllProductImagess();
	}
	@Get(':id')
	async getProductImagesDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductImages> {
		return await this.productImagesService.getProductImagesDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createProductImages(
		@Body() createProductImagesDto: CreateProductImagesDto
	): Promise<ProductImages> {
		return await this.productImagesService.createProductImages(
			createProductImagesDto
		);
	}

	@Put(':id')
	async updateProductImages(
		@Body(ValidationPipe) updateProductImagesDto: UpdateProductImagesDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductImages> {
		return await this.productImagesService.updateProductImages(
			id,
			updateProductImagesDto
		);
	}

	@Delete(':id')
	async removeProductImages(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productImagesService.removeProductImages(id);
	}
}
