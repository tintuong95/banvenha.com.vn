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
import {NewsImageService} from './news-image.service';

import {CreateNewsImageDto, UpdateNewsImageDto} from './dto/news-images.dto';
import {NewsImage} from './entity/news-images.entity';

@Controller('news-images')
export class NewsImageController {
	constructor(private newsImageService: NewsImageService) {}
	@Get('')
	async getAllNewsImages(): Promise<any> {
		return await this.newsImageService.getAllNewsImages();
	}
	@Get(':id')
	async getNewsImageDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsImage> {
		return await this.newsImageService.getNewsImageDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createNewsImage(
		@Body() createNewsImageDto: CreateNewsImageDto
	): Promise<NewsImage> {
		return await this.newsImageService.createNewsImage(createNewsImageDto);
	}

	@Put(':id')
	async updateNewsImage(
		@Body(ValidationPipe) updateNewsImageDto: UpdateNewsImageDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsImage> {
		return await this.newsImageService.updateNewsImage(id, updateNewsImageDto);
	}

	@Delete(':id')
	async removeNewsImage(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsImageService.removeNewsImage(id);
	}
}
