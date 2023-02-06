import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';
import {OrderRepository} from './repository/order.repository';

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	imports: [TypeOrmModule.forFeature([OrderRepository])],
	exports: [TypeOrmModule],
})
export class OrderModule {}
