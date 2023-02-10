import {Module} from '@nestjs/common';

import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductDetailsModule} from '~module/product-details/product-details.module';
import {ProductFilesModule} from '~module/product-files/product-files.module';
import {ProductImagesModule} from '~module/product-images/product-images.module';
import {Product} from './entity/product.entity';
import {ProductController} from './product.controller';
import {ProductService} from './product.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [
		TypeOrmModule.forFeature([Product]),
		ProductDetailsModule,
		ProductFilesModule,
		ProductImagesModule,
	],
	exports: [TypeOrmModule],
})
export class ProductModule {}
