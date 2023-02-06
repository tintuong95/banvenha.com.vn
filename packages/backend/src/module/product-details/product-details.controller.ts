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
import {ProductDetailsService} from './product-details.service';
import {
	CreateProductDetailsDto,
	UpdateProductDetailsDto,
} from './dto/product-details.dto';
import {ProductDetails} from './entity/product-details.entity';

@Controller('product-details')
export class ProductDetailsController {
	constructor(private productDetailsService: ProductDetailsService) {}
	@Get('')
	async getAllProductDetailss(): Promise<any> {
		return await this.productDetailsService.getAllProductDetailss();
	}
	@Get(':id')
	async getProductDetailsDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductDetails> {
		return await this.productDetailsService.getProductDetailsDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createProductDetails(
		@Body() createProductDetailsDto: CreateProductDetailsDto
	): Promise<ProductDetails> {
		return await this.productDetailsService.createProductDetails(
			createProductDetailsDto
		);
	}

	@Put(':id')
	async updateProductDetails(
		@Body(ValidationPipe) updateProductDetailsDto: UpdateProductDetailsDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductDetails> {
		return await this.productDetailsService.updateProductDetails(
			id,
			updateProductDetailsDto
		);
	}

	@Delete(':id')
	async removeProductDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productDetailsService.removeProductDetails(id);
	}
}
