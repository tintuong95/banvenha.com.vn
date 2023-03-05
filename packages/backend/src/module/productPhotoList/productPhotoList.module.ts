import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductPhotoList} from './entity/productPhotoList.entity';
import {ProductPhotoListService} from './productPhotoList.service';

@Module({
	providers: [ProductPhotoListService],
	imports: [TypeOrmModule.forFeature([ProductPhotoList])],
	exports: [TypeOrmModule, ProductPhotoListService],
})
export class ProductPhotoListsModule {}
