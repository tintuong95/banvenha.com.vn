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
	Query,
	Request,
} from '@nestjs/common';
import {ProductTagsService} from './product-tag.service';
import {
	CreateProductTagsDto,
	UpdateProductTagsDto,
} from './dto/product-tag.dto';
import {ProductTags} from './entity/product-tag.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {User} from '~shared/user.decorator';
import {UserDto} from '~shared/user.dto';

@Controller('product-tags')
@UseGuards(JwtAuthGuard)
export class ProductTagsController {
	constructor(private productTagsService: ProductTagsService) {}

	// @Get('list')
	// async getAllProductTagss(
	// 	@Query() query: any,
	// 	@Request() req: any,
	// 	@User() user: UserDto
	// ): Promise<any> {
	// 	return await this.productTagsService.getAllProductTags(req, query, user);
	// }

	@Get(':id/details')
	async getProductTagsDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductTags> {
		return await this.productTagsService.getProductTagsDetails(id);
	}

	// @Roles(ROLE.ADMIN)
	// @Post('create')
	// @HttpCode(HttpStatus.CREATED)
	// async createProductTags(
	// 	@Body() createProductTagsDto: CreateProductTagsDto
	// ): Promise<ProductTags> {
	// 	return await this.productTagsService.createProductTags(createProductTagsDto);
	// }

	// @Roles(ROLE.ADMIN)
	// @Post(':id/update')
	// async updateProductTags(
	// 	@Body(ValidationPipe) updateProductTagsDto: UpdateProductTagsDto,
	// 	@Param('id', ParseIntPipe) id: number
	// ): Promise<ProductTags> {
	// 	return await this.productTagsService.updateProductTags(id, updateProductTagsDto);
	// }

	@Roles(ROLE.ADMIN, ROLE.PARTNER)
	@Post(':id/remove')
	async removeProductTags(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productTagsService.removeProductTags(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteProductTags(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productTagsService.deleteProductTags(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreProductTags(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productTagsService.restoreProductTags(id);
	}
}
