import {
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseGuards,
} from '@nestjs/common';
import {NewsImageService} from './news-image.service';
import {NewsImage} from './entity/news-images.entity';
import {JwtAuthGuard} from '~module/auth/jwt-auth.guard';
import {Roles} from '~module/auth/roles.decorator';
import {ROLE} from '~contants/role';

@Controller('news-image')
@UseGuards(JwtAuthGuard)
export class NewsImageController {
	constructor(private newsImageService: NewsImageService) {}
	@Get('/list')
	async getAllNewsImages(): Promise<any> {
		return await this.newsImageService.getAllNewsImages();
	}
	@Get(':id/details')
	async getNewsImageDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsImage> {
		return await this.newsImageService.getNewsImageDetails(id);
	}

	// @Roles(ROLE.PARTNER)
	// @Post('create')
	// @HttpCode(HttpStatus.CREATED)
	// async createNewsImage(
	// 	@Body() createNewsImageDto: CreateNewsImageDto
	// ): Promise<NewsImage> {
	// 	return await this.newsImageService.createNewsImage(createNewsImageDto);
	// }

	// @Roles(ROLE.PARTNER)
	// @Post(':id/update')
	// async updateNewsImage(
	// 	@Body(ValidationPipe) updateNewsImageDto: UpdateNewsImageDto,
	// 	@Param('id', ParseIntPipe) id: number
	// ): Promise<NewsImage> {
	// 	return await this.newsImageService.updateNewsImage(id, updateNewsImageDto);
	// }

	@Roles(ROLE.PARTNER, ROLE.ADMIN)
	@Post(':id/remove')
	async removeNewsImage(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsImageService.removeNewsImage(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/delete')
	async deleteNewsImage(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsImageService.deleteNewsImage(id);
	}

	@Roles(ROLE.ADMIN)
	@Post(':id/restore')
	async restoreNewsImage(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsImageService.restoreNewsImage(id);
	}
}
