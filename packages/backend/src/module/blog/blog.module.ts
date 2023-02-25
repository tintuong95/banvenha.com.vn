import {Module} from '@nestjs/common';
import {NewsController} from './blog.controller';
import {NewsService} from './blog.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {News} from './entity/blog.entity';

@Module({
	controllers: [NewsController],
	providers: [NewsService],
	imports: [TypeOrmModule.forFeature([News])],
	exports: [TypeOrmModule],
})
export class NewsModule {}
