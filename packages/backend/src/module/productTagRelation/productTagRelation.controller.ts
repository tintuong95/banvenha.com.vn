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

import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';
import {ProductTagRelationService} from '~module/productTagRelation/productTagRelation.service';
import {
	CreateProductTagRelationDto,
	UpdateProductTagRelationDto,
} from '~module/productTagRelation/dto/productTagRelation.dto';
import {ProductTagRelation} from './entity/productTagRelation.entity';

@Controller('product_tag_relation')
@UseGuards(JwtAuthGuard)
export class ProductTagRelationController {
	constructor(private productTagRelationService: ProductTagRelationService) {}
	@Get('list')
	async getAllProductTagRelations(): Promise<any> {
		return await this.productTagRelationService.getAllProductTagRelations();
	}
	@Get(':id/details')
	async getProductTagRelationDetails(
		@Param('id') id: string
	): Promise<ProductTagRelation> {
		return await this.productTagRelationService.getProductTagRelationDetails(
			id
		);
	}

	@Roles(ROLE.ADMIN)
	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	async createProductTagRelation(
		@Body() createProductTagRelationDto: CreateProductTagRelationDto
	): Promise<ProductTagRelation> {
		return await this.productTagRelationService.createProductTagRelation(
			createProductTagRelationDto
		);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/update')
	async updateProductTagRelation(
		@Body(ValidationPipe)
		updateProductTagRelationDto: UpdateProductTagRelationDto,
		@Param('id') id: string
	): Promise<ProductTagRelation> {
		return await this.productTagRelationService.updateProductTagRelation(
			id,
			updateProductTagRelationDto
		);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteProductTagRelation(@Param('id') id: string): Promise<string> {
		return await this.productTagRelationService.deleteProductTagRelation(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/remove')
	async removeProductTagRelation(@Param('id') id: string): Promise<string> {
		return await this.productTagRelationService.removeProductTagRelation(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreProductTagRelation(@Param('id') id: string): Promise<string> {
		return await this.productTagRelationService.restoreProductTagRelation(id);
	}
}
