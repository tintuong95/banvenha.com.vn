import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductPhotoList} from './entity/productPhotoList.entity';
import {ProductPhotoListController} from './productPhotoList.controller';
import {ProductPhotoListService} from './productPhotoList.service';

@Module({
	controllers: [ProductPhotoListController],
	providers: [ProductPhotoListService],
	imports: [TypeOrmModule.forFeature([ProductPhotoList])],
	exports: [TypeOrmModule],
})
export class ProductPhotoListsModule {}
