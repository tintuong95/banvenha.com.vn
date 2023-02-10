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
} from '@nestjs/common';
import {ProductImagesService} from './product-images.service';
import {
	CreateProductImagesDto,
	UpdateProductImagesDto,
} from './dto/product-images.dto';
import {ProductImages} from './entity/product-images.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('product-images')
@UseGuards(JwtAuthGuard)
export class ProductImagesController {
	constructor(private productImagesService: ProductImagesService) {}
	@Get('list')
	async getAllProductImagess(): Promise<any> {
		return await this.productImagesService.getAllProductImagess();
	}
	@Get(':id/details')
	async getProductImagesDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductImages> {
		return await this.productImagesService.getProductImagesDetails(id);
	}

	@Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createProductImages(
		@Body() createProductImagesDto: CreateProductImagesDto[]
	): Promise<ProductImages[]> {
		return await this.productImagesService.createProductImages(
			createProductImagesDto
		);
	}

	@Roles(ROLE.PARTNER)
	@Post(':id/update')
	async updateProductImages(
		@Body(ValidationPipe) updateProductImagesDto: UpdateProductImagesDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductImages> {
		return await this.productImagesService.updateProductImages(
			id,
			updateProductImagesDto
		);
	}

	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	@Post(':id/remove')
	async removeProductImages(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productImagesService.removeProductImages(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreProductImages(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productImagesService.restoreProductImages(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteProductImages(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productImagesService.deleteProductImages(id);
	}
}
