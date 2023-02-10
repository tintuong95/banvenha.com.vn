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
import {ProductFilesService} from './product-files.service';
import {
	CreateProductFilesDto,
	UpdateProductFilesDto,
} from './dto/product-files.dto';
import {ProductFiles} from './entity/product-files.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('product-files')
@UseGuards(JwtAuthGuard)
export class ProductFilesController {
	constructor(private productFilesService: ProductFilesService) {}
	@Get('list')
	async getAllProductFiless(): Promise<any> {
		return await this.productFilesService.getAllProductFiles();
	}
	@Get(':id/details')
	async getProductFilesDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductFiles> {
		return await this.productFilesService.getProductFilesDetails(id);
	}

	@Roles(ROLE.PARTNER)
	@Post('create')
	@HttpCode(HttpStatus.CREATED)
	async createProductFiles(
		@Body() createProductFilesDto: CreateProductFilesDto
	): Promise<ProductFiles> {
		return await this.productFilesService.createProductFiles(
			createProductFilesDto
		);
	}

	@Roles(ROLE.PARTNER)
	@Post(':id/update')
	async updateProductFiles(
		@Body(ValidationPipe) updateProductFilesDto: UpdateProductFilesDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductFiles> {
		return await this.productFilesService.updateProductFiles(
			id,
			updateProductFilesDto
		);
	}

	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	@Post(':id/remove')
	async removeProductFiles(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productFilesService.removeProductFiles(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreProductFiles(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productFilesService.restoreProductFiles(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteProductFiles(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productFilesService.deleteProductFiles(id);
	}
}
