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
import { NewsService } from './news.service';

import {CreateNewsDto, UpdateNewsDto} from './dto/news.dto';
import {News} from './entity/news.entity';

@Controller('news')
export class NewsController {
	constructor(private NewsService: NewsService) {}
	@Get('')
	async getAllNewss(): Promise<any> {
		return await this.NewsService.getAllNewss();
	}
	@Get(':id')
	async getNewsDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<News> {
		return await this.NewsService.getNewsDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createNews(
		@Body() createNewsDto: CreateNewsDto
	): Promise<News> {
		return await this.NewsService.createNews(createNewsDto);
	}

	@Put(':id')
	async updateNews(
		@Body(ValidationPipe) updateNewsDto: UpdateNewsDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<News> {
		return await this.NewsService.updateNews(id, updateNewsDto);
	}

	@Delete(':id')
	async removeNews(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.NewsService.removeNews(id);
	}
}
