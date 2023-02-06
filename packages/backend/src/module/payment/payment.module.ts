import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Payment} from './entity/payment.entity';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
@Module({
	controllers: [PaymentController],
	providers: [PaymentService],
	imports: [TypeOrmModule.forFeature([Payment])],
	exports: [TypeOrmModule],
})
export class PaymentModule {}
