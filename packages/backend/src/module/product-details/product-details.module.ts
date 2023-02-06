import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductDetailsController} from './product-details.controller';
import {ProductDetailsService} from './product-details.service';
import {ProductDetailsRepository} from './repository/product-details.repository';

@Module({
	controllers: [ProductDetailsController],
	providers: [ProductDetailsService],
	imports: [TypeOrmModule.forFeature([ProductDetailsRepository])],
	exports: [TypeOrmModule],
})
export class ProductDetailsModule {}
