import {Module} from '@nestjs/common';
import {AdminController} from './admin.controller';
import {AdminService} from './admin.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Admin} from './entity/admin.entity';

@Module({
	controllers: [AdminController],
	providers: [AdminService],
	imports: [TypeOrmModule.forFeature([Admin])],
	exports: [TypeOrmModule],
})
export class AdminModule {}
