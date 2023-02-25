import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductTagsController} from './product-tag.controller';
import {ProductTagsService} from './product-tag.service';
import {ProductTags} from './entity/product-tag.entity';

@Module({
	controllers: [ProductTagsController],
	providers: [ProductTagsService],
	imports: [TypeOrmModule.forFeature([ProductTags])],
	exports: [TypeOrmModule],
})
export class ProductTagsModule {}
