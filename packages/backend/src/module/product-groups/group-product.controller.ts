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
import {ProductGroupService} from './group-product.service';
import {
	CreateProductGroupDto,
	UpdateProductGroupDto,
} from './dto/product-group.dto';
import {ProductGroup} from './entity/product-group.entity';

@Controller('product-group')
export class ProductGroupController {
	constructor(private productGroupService: ProductGroupService) {}
	@Get('')
	async getAllProductGroups(): Promise<any> {
		return await this.productGroupService.getAllProductGroups();
	}
	@Get(':id')
	async getProductGroupDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductGroup> {
		return await this.productGroupService.getProductGroupDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createProductGroup(
		@Body() createProductGroupDto: CreateProductGroupDto
	): Promise<ProductGroup> {
		return await this.productGroupService.createProductGroup(
			createProductGroupDto
		);
	}

	@Put(':id')
	async updateProductGroup(
		@Body(ValidationPipe) updateProductGroupDto: UpdateProductGroupDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<ProductGroup> {
		return await this.productGroupService.updateProductGroup(
			id,
			updateProductGroupDto
		);
	}

	@Delete(':id')
	async removeProductGroup(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.productGroupService.removeProductGroup(id);
	}
}
