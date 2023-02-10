import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductImages} from './entity/product-images.entity';
import {ProductImagesController} from './product-images.controller';
import {ProductImagesService} from './product-images.service';

@Module({
	controllers: [ProductImagesController],
	providers: [ProductImagesService],
	imports: [TypeOrmModule.forFeature([ProductImages])],
	exports: [TypeOrmModule, ProductImagesService],
})
export class ProductImagesModule {}
