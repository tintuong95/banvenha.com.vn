import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BlogTagRelation} from './entity/bogTagRelation.entity';
import {BlogTagRelationController} from './blogTagRelation.controller';
import {BlogTagRelationService} from './blogTagRelation.service';

@Module({
	controllers: [BlogTagRelationController],
	providers: [BlogTagRelationService],
	imports: [TypeOrmModule.forFeature([BlogTagRelation])],
	exports: [TypeOrmModule],
})
export class BlogTagRelationModule {}
