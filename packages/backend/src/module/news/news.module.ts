import { Module } from '@nestjs/common';
import {  NewsController } from './news.controller';
import {  NewsRepository } from './repository/news.repository';
import {  NewsService } from './news.service';
import {TypeOrmModule} from "@nestjs/typeorm"

@Module({
	controllers: [NewsController],
	providers: [NewsService],
	imports: [TypeOrmModule.forFeature([NewsRepository])],
	exports: [TypeOrmModule],
})
export class NewsModule {}
