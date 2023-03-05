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
	Query,
	Request,
	UploadedFile,
} from '@nestjs/common';
import {ProductService} from './product.service';
import {CreateProductDto, UpdateProductDto} from './dto/product.dto';
import {Product} from './entity/product.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {uploadFileConfig} from '~config/multer.config';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';
import {REGEX_IMAGE, REGEX_IMAGE_RAR} from '~util/regex';

@Controller('product')
@UseGuards(JwtAuthGuard)
export class ProductController {
	constructor(private productService: ProductService) {}
	@Get('list')
	async getAllProducts(
		@Query() query: any,
		@Request() req: any,
		@User() user: UserDto
	): Promise<any> {
		return await this.productService.getAllProducts(req, query, user);
	}

	@Get(':id/details')
	async getProductDetails(@Param('id') id: string): Promise<Product> {
		return await this.productService.getProductDetails(id);
	}

	@Get(':slug/slug/details')
	async getProductSlugDetails(@Param('slug') slug: string): Promise<Product> {
		return await this.productService.getProductSlugDetails(slug);
	}

	@Roles(ROLE.PARTNER)
	@Post('create')
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{name: 'photo', maxCount: 1},
				{name: 'photoList', maxCount: 10},
			],
			uploadFileConfig(1048576, REGEX_IMAGE_RAR)
		)
	)
	@HttpCode(HttpStatus.CREATED)
	async createProduct(
		@UploadedFiles()
		files: {
			photo?: Express.Multer.File;
			photoList?: Express.Multer.File[];
		},
		@Body() createProductDto: CreateProductDto,
		@User() user: UserDto
	): Promise<Product | any> {
		const {photo, photoList} = files;
		console.log('createProductDto', createProductDto);
		return await this.productService.createProduct(
			createProductDto,
			photo,
			photoList,
			user.id
		);
	}

	@Post(':id/update')
	@UseInterceptors(
		FileFieldsInterceptor(
			[
				{name: 'photo', maxCount: 1},
				{name: 'photoList', maxCount: 10},
			],
			uploadFileConfig(1048576, REGEX_IMAGE)
		)
	)
	@Roles(ROLE.PARTNER)
	async updateProduct(
		@UploadedFiles()
		files: {
			photo?: Express.Multer.File;
			photoList?: Express.Multer.File[];
		},
		@Body(ValidationPipe)
		updateProductDto: any,
		@Param('id') id: string,
		@User() user: UserDto
	): Promise<Product> {
		return await this.productService.updateProduct(
			id,
			updateProductDto,
			files,
			user.id
		);
	}

	@Post(':id/remove')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async removeProduct(@Param('id') id: string): Promise<string> {
		return await this.productService.removeProduct(id);
	}

	@Post(':id/restore')
	@Roles(ROLE.ADMIN)
	async restoreProduct(@Param('id') id: string): Promise<string> {
		return await this.productService.restoreProduct(id);
	}

	@Post(':id/delete')
	@Roles(ROLE.ADMIN)
	async deleteProduct(@Param('id') id: string): Promise<string> {
		return await this.productService.deleteProduct(id);
	}

	@Post(':id/status')
	@Roles(ROLE.ADMIN)
	async updateStatusProductByAdmin(
		@Param('id') id: string,
		@Body() statusDto: UpdateProductDto
	): Promise<string> {
		return await this.productService.updateStatusByAdmin(id, statusDto);
	}

	@Get('/count')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async countProduct(@User() user: UserDto): Promise<string> {
		return await this.productService.countProduct(user);
	}

	@Get('/informations')
	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	async viewsLikeTotal(@User() user: UserDto): Promise<string> {
		return await this.productService.viewsLikeTotal(user);
	}
}
