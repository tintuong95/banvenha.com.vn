import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';
import {ProductRepository} from './repository/Product.repository';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [TypeOrmModule.forFeature([ProductRepository])],
	exports: [TypeOrmModule],
})
export class ProductModule {}
