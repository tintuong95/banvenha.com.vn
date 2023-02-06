import {Module} from '@nestjs/common';

import {ProductFilesRepository} from './repository/product-files.repository';
import {ProductFilesService} from './product-files.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductFilesController} from './product-files.controller';

@Module({
	controllers: [ProductFilesController],
	providers: [ProductFilesService],
	imports: [TypeOrmModule.forFeature([ProductFilesRepository])],
	exports: [TypeOrmModule],
})
export class ProductFilesModule {}
