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
import {ProductGroup} from './entity/productGroup.entity';
import {
	CreateProductGroupDto,
	UpdateProductGroupDto,
} from './dto/productGroup.dto';
import {ProductGroupService} from './productGroup.service';

@Controller('productGroups')
@UseGuards(JwtAuthGuard)
export class ProductGroupController {
	constructor(private productGroupService: ProductGroupService) {}
	@Get('list')
	async getAllProductGroups(): Promise<any> {
		return await this.productGroupService.getAllProductGroups();
	}
	@Get(':id/details')
	async getProductGroupDetails(
		@Param('id', ParseIntPipe) id: string
	): Promise<ProductGroup> {
		return await this.productGroupService.getProductGroupDetails(id);
	}

	@Roles(ROLE.ADMIN)
	@Post('/create')
	@HttpCode(HttpStatus.CREATED)
	async createProductGroup(
		@Body() createProductGroupDto: CreateProductGroupDto
	): Promise<ProductGroup> {
		return await this.productGroupService.createProductGroup(
			createProductGroupDto
		);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/update')
	async updateProductGroup(
		@Body(ValidationPipe) updateProductGroupDto: UpdateProductGroupDto,
		@Param('id', ParseIntPipe) id: string
	): Promise<ProductGroup> {
		return await this.productGroupService.updateProductGroup(
			id,
			updateProductGroupDto
		);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteProductGroup(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.productGroupService.deleteProductGroup(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/remove')
	async removeProductGroup(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.productGroupService.removeProductGroup(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreProductGroup(
		@Param('id', ParseIntPipe) id: string
	): Promise<string> {
		return await this.productGroupService.restoreProductGroup(id);
	}
}
