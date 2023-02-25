import {Module} from '@nestjs/common';
import {VerifiedService} from './verified.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Verified} from './entity/verified.entity';
import {VerifiedController} from './verified.controller';

@Module({
	controllers: [VerifiedController],
	providers: [VerifiedService],
	imports: [TypeOrmModule.forFeature([Verified])],
	exports: [TypeOrmModule, VerifiedService],
})
export class VerifiedModule {}
