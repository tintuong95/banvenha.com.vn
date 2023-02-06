import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {PaymentController} from './payment.controller';
import {PaymentService} from './payment.service';
import {PaymentRepository} from './repository/payment.repository';

@Module({
	controllers: [PaymentController],
	providers: [PaymentService],
	imports: [TypeOrmModule.forFeature([PaymentRepository])],
	exports: [TypeOrmModule],
})
export class PaymentModule {}
