import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductTags} from './entity/productTag.entity';
import {ProductTagsController} from './productTag.controller';
import {ProductTagsService} from './productTag.service';

@Module({
	controllers: [ProductTagsController],
	providers: [ProductTagsService],
	imports: [TypeOrmModule.forFeature([ProductTags])],
	exports: [TypeOrmModule],
})
export class ProductTagsModule {}
