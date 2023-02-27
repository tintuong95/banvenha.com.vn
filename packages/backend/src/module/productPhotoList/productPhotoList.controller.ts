import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	ValidationPipe,
	HttpStatus,
	HttpCode,
	UseGuards,
} from '@nestjs/common';

import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {ProductPhotoList} from './entity/productPhotoList.entity';
import {
	CreateproductPhotoListDto,
	UpdateproductPhotoListDto,
} from './dto/productPhotoList.dto';
import {ProductPhotoListService} from './productPhotoList.service';

@Controller('product_photo_list')
@UseGuards(JwtAuthGuard)
export class ProductPhotoListController {
	constructor(private productPhotoListService: ProductPhotoListService) {}
	@Get('list')
	async getAllProductPhotoLists(): Promise<any> {
		return await this.productPhotoListService.getAllProductPhotoLists();
	}
	@Get(':id/details')
	async getProductPhotoListDetails(
		@Param('id') id: string
	): Promise<ProductPhotoList> {
		return await this.productPhotoListService.getProductPhotoListDetails(id);
	}

	@Roles(ROLE.ADMIN)
	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	async createProductPhotoList(
		@Body() createProductPhotoListDto: CreateproductPhotoListDto
	): Promise<ProductPhotoList> {
		return await this.productPhotoListService.createProductPhotoList(
			createProductPhotoListDto
		);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/update')
	async updateProductPhotoList(
		@Body(ValidationPipe) updateProductPhotoListDto: UpdateproductPhotoListDto,
		@Param('id') id: string
	): Promise<ProductPhotoList> {
		return await this.productPhotoListService.updateProductPhotoList(
			id,
			updateProductPhotoListDto
		);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteProductPhotoList(@Param('id') id: string): Promise<string> {
		return await this.productPhotoListService.deleteProductPhotoList(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/remove')
	async removeProductPhotoList(@Param('id') id: string): Promise<string> {
		return await this.productPhotoListService.removeProductPhotoList(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreProductPhotoList(@Param('id') id: string): Promise<string> {
		return await this.productPhotoListService.restoreProductPhotoList(id);
	}
}
