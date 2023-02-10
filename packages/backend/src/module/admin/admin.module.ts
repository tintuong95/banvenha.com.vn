import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AdminService} from './Admin.service';

import {Admin} from './entity/admin.entity';

@Module({
	providers: [AdminService],
	imports: [TypeOrmModule.forFeature([Admin])],
	exports: [TypeOrmModule],
})
export class AdminModule {}
