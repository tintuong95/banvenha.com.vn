import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductDetails} from './entity/product-details.entity';
import {ProductDetailsController} from './product-details.controller';
import {ProductDetailsService} from './product-details.service';

@Module({
	controllers: [ProductDetailsController],
	providers: [ProductDetailsService],
	imports: [TypeOrmModule.forFeature([ProductDetails])],
	exports: [TypeOrmModule],
})
export class ProductDetailsModule {}
