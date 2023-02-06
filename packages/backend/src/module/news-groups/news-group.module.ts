import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {NewsGroup} from './entity/news-group.entity';
import {NewsGroupController} from './news-group.controller';
import {NewsGroupService} from './news-group.service';

@Module({
	controllers: [NewsGroupController],
	providers: [NewsGroupService],
	imports: [TypeOrmModule.forFeature([NewsGroup])],
	exports: [TypeOrmModule],
})
export class NewsGroupModule {}
