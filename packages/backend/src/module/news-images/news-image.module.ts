import {Module} from '@nestjs/common';
import {NewsImageRepository} from './repository/news-images.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {NewsImageController} from './news-image.controller';
import {NewsImageService} from './news-image.service';

@Module({
	controllers: [NewsImageController],
	providers: [NewsImageService],
	imports: [TypeOrmModule.forFeature([NewsImageRepository])],
	exports: [TypeOrmModule],
})
export class NewsImageModule {}
