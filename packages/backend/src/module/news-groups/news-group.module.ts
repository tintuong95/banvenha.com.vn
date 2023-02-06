import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {NewsGroupController} from './news-group.controller';
import {NewsGroupService} from './news-group.service';
import {NewsGroupRepository} from './repository/news-group.repository';

@Module({
	controllers: [NewsGroupController],
	providers: [NewsGroupService],
	imports: [TypeOrmModule.forFeature([NewsGroupRepository])],
	exports: [TypeOrmModule],
})
export class NewsGroupModule {}
