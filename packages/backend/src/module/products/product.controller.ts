import {
	Body,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
	UseInterceptors,
	UploadedFiles,
	UploadedFile,
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductAllFieldDto, UpdateProductDto} from './dto/product.dto';
import {Product} from './entity/product.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {
	FileFieldsInterceptor,
	FileInterceptor,
	FilesInterceptor,
} from '@nestjs/platform-express';
import {uploadFileConfig} from '~config/multer.config';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
	constructor(private productService: ProductService) {}
	@Get('list')
	async getAllProducts(): Promise<any> {
		return await this.productService.getAllProducts();
	}
	@Get(':id/details')
	async getProductDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Product> {
		return await this.productService.getProductDetails(id);
	}

	@Roles(ROLE.PARTNER)
	@Post('create')
	// @UseInterceptors(
	// 	FileInterceptor(
	// 		'image',
	// 		uploadFileConfig(1048576, /\/(jpg|jpeg|png|gif)$/, 'images/products')
	// 	)
	// )
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{name: 'image', maxCount: 1},
				{name: 'images', maxCount: 10},
			],
			uploadFileConfig(1048576, /\/(jpg|jpeg|png|gif)$/, 'images/products')
		)
	)
	@HttpCode(HttpStatus.CREATED)
	async createProduct(
		// @UploadedFile() file: Express.Multer.File,
		@UploadedFiles()
		files: {image?: Express.Multer.File; images?: Express.Multer.File[]},
		@Body() createProductAllDto: CreateProductAllFieldDto,
		@User() user: UserDto
	): Promise<Product | any> {
		const {image, images} = files;
		return await this.productService.createProduct(
			createProductAllDto,
			image,
			images,
			user.id
		);
	}

	@Post(':id/update')
	@Roles(ROLE.PARTNER)
	async updateProduct(
		@Body(ValidationPipe) updateProductDto: UpdateProductDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Product> {
		return await this.productService.updateProduct(id, updateProductDto);
	}

	@Post(':id/remove')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.productService.removeProduct(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.productService.restoreProduct(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.productService.deleteProduct(id);
	}
}
