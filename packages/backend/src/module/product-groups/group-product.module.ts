import {Module} from '@nestjs/common';
import {ProductGroupService} from './group-product.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductGroupController} from './group-product.controller';
import {ProductGroup} from './entity/product-group.entity';

@Module({
	controllers: [ProductGroupController],
	providers: [ProductGroupService],
	imports: [TypeOrmModule.forFeature([ProductGroup])],
	exports: [TypeOrmModule],
})
export class ProductGroupsModule {}
