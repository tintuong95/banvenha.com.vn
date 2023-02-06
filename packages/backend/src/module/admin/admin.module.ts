import {Module} from '@nestjs/common';
import {AdminController} from './admin.controller';
import {AdminRepository} from './repository/admin.repository';
import {AdminService} from './admin.service';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
	controllers: [AdminController],
	providers: [AdminService],
	imports: [TypeOrmModule.forFeature([AdminRepository])],
	exports: [TypeOrmModule],
})
export class AdminModule {}
