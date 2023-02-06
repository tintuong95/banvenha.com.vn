import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {NewsImageController} from './news-image.controller';
import {NewsImageService} from './news-image.service';
import {NewsImage} from './entity/news-images.entity';

@Module({
	controllers: [NewsImageController],
	providers: [NewsImageService],
	imports: [TypeOrmModule.forFeature([NewsImage])],
	exports: [TypeOrmModule],
})
export class NewsImageModule {}
