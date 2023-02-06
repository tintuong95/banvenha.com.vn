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
import {NewsGroupService} from './news-group.service';
import {CreateNewsGroupDto, UpdateNewsGroupDto} from './dto/news-group.dto';
import {NewsGroup} from './entity/news-group.entity';

@Controller('group-news')
export class NewsGroupController {
	constructor(private newsGroupService: NewsGroupService) {}
	@Get('')
	async getAllNewsGroups(): Promise<any> {
		return await this.newsGroupService.getAllNewsGroups();
	}
	@Get(':id')
	async getNewsGroupDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsGroup> {
		return await this.newsGroupService.getNewsGroupDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createNewsGroup(
		@Body() createNewsGroupDto: CreateNewsGroupDto
	): Promise<NewsGroup> {
		return await this.newsGroupService.createNewsGroup(createNewsGroupDto);
	}

	@Put(':id')
	async updateNewsGroup(
		@Body(ValidationPipe) updateNewsGroupDto: UpdateNewsGroupDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<NewsGroup> {
		return await this.newsGroupService.updateNewsGroup(id, updateNewsGroupDto);
	}

	@Delete(':id')
	async removeNewsGroup(
		@Param('id', ParseIntPipe) id: number
	): Promise<string> {
		return await this.newsGroupService.removeNewsGroup(id);
	}
}
