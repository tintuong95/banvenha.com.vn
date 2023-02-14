import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Admin} from '../entity/admin.entity';

import {AdminChildService} from './admin.auth.service';

@Module({
	providers: [AdminChildService],
	imports: [TypeOrmModule.forFeature([Admin])],
	exports: [TypeOrmModule, AdminChildService],
})
export class AdminChildModule {}
