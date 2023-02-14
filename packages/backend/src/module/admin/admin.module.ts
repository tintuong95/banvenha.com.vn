import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';

import {Admin} from './entity/admin.entity';

@Module({
	providers: [AdminService],
	imports: [TypeOrmModule.forFeature([Admin])],
	exports: [TypeOrmModule],
	controllers: [AdminController],
})
export class AdminModule {}
