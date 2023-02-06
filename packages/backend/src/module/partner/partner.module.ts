import {Module} from '@nestjs/common';
import {PartnerRepository} from './repository/partner.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PartnerController} from './partner.controller';
import {PartnerService} from './partner.service';

@Module({
	controllers: [PartnerController],
	providers: [PartnerService],
	imports: [TypeOrmModule.forFeature([PartnerRepository])],
	exports: [TypeOrmModule],
})
export class PartnerModule {}
