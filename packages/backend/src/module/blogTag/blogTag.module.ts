import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogTag} from './entity/blogTag.entity';
import {BlogTagController} from './blogTag.controller';
import {BlogTagService} from './blogTag.service';

@Module({
	controllers: [BlogTagController],
	providers: [BlogTagService],
	imports: [TypeOrmModule.forFeature([BlogTag])],
	exports: [TypeOrmModule],
})
export class BlogTagModule {}
