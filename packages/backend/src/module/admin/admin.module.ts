import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AdminController} from './admin.controller';
import {AdminService} from './Admin.service';

import {Admin} from './entity/admin.entity';

@Module({
	controllers: [AdminController],
	providers: [AdminService],
	imports: [TypeOrmModule.forFeature([Admin])],
	exports: [TypeOrmModule],
})
export class AdminModule {}
