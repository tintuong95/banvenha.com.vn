import {Module} from '@nestjs/common';
import {ProductFilesService} from './product-files.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductFilesController} from './product-files.controller';
import {ProductFiles} from './entity/product-files.entity';

@Module({
	controllers: [ProductFilesController],
	providers: [ProductFilesService],
	imports: [TypeOrmModule.forFeature([ProductFiles])],
	exports: [TypeOrmModule],
})
export class ProductFilesModule {}
