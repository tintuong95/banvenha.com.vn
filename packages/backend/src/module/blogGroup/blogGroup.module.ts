import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogGroup} from './entity/blogGroup.entity';
import {BlogGroupController} from './blogGroup.controller';
import {BlogGroupService} from './blogGroup.service';

@Module({
	controllers: [BlogGroupController],
	providers: [BlogGroupService],
	imports: [TypeOrmModule.forFeature([BlogGroup])],
	exports: [TypeOrmModule],
})
export class BlogGroupModule {}
