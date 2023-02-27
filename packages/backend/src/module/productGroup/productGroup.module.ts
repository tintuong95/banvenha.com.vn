import {Module} from '@nestjs/common';
import {ProductGroupService} from './productGroup.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductGroupController} from './productGroup.controller';
import {ProductGroup} from './entity/productGroup.entity';

@Module({
	controllers: [ProductGroupController],
	providers: [ProductGroupService],
	imports: [TypeOrmModule.forFeature([ProductGroup])],
	exports: [TypeOrmModule],
})
export class ProductGroupsModule {}
