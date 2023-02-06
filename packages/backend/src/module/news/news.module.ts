import {Module} from '@nestjs/common';
import {NewsController} from './news.controller';
import {NewsService} from './news.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {News} from './entity/news.entity';

@Module({
	controllers: [NewsController],
	providers: [NewsService],
	imports: [TypeOrmModule.forFeature([News])],
	exports: [TypeOrmModule],
})
export class NewsModule {}
