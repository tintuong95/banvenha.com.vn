import {Module} from '@nestjs/common';

import {ProductGroupRepository} from './repository/product-group.repository';
import {ProductGroupService} from './group-product.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductGroupController} from './group-product.controller';

@Module({
	controllers: [ProductGroupController],
	providers: [ProductGroupService],
	imports: [TypeOrmModule.forFeature([ProductGroupRepository])],
	exports: [TypeOrmModule],
})
export class ProductGroupsModule {}
