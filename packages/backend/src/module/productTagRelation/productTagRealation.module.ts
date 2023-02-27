import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductTagRelation} from './entity/productTagRelation.entity';
import {ProductTagRelationController} from './productTagRelation.controller';
import {ProductTagRelationService} from './productTagRelation.service';

@Module({
	controllers: [ProductTagRelationController],
	providers: [ProductTagRelationService],
	imports: [TypeOrmModule.forFeature([ProductTagRelation])],
	exports: [TypeOrmModule],
})
export class ProductTagRelationsModule {}
