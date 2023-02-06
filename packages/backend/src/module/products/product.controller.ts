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
import {ProductService} from './product.service';
import {CreateProductDto, UpdateProductDto} from './dto/product.dto';
import {Product} from './entity/product.entity';

@Controller('product')
export class ProductController {
	constructor(private productService: ProductService) {}
	@Get('')
	async getAllProducts(): Promise<any> {
		return await this.productService.getAllProducts();
	}
	@Get(':id')
	async getProductDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Product> {
		return await this.productService.getProductDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createProduct(
		@Body() createProductDto: CreateProductDto
	): Promise<Product> {
		return await this.productService.createProduct(createProductDto);
	}

	@Put(':id')
	async updateProduct(
		@Body(ValidationPipe) updateProductDto: UpdateProductDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Product> {
		return await this.productService.updateProduct(id, updateProductDto);
	}

	@Delete(':id')
	async removeProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.productService.removeProduct(id);
	}
}
