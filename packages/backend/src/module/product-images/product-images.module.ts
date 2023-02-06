import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductImagesController} from './product-images.controller';
import {ProductImagesService} from './product-images.service';
import {ProductImagesRepository} from './repository/product-images.repository';

@Module({
	controllers: [ProductImagesController],
	providers: [ProductImagesService],
	imports: [TypeOrmModule.forFeature([ProductImagesRepository])],
	exports: [TypeOrmModule],
})
export class ProductImagesModule {}
