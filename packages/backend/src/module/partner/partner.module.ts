import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PartnerController} from './partner.controller';
import {PartnerService} from './partner.service';
import {Partner} from './entity/partner.entity';

@Module({
	controllers: [PartnerController],
	providers: [PartnerService],
	imports: [TypeOrmModule.forFeature([Partner])],
	exports: [TypeOrmModule],
})
export class PartnerModule {}
