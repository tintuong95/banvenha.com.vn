import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Order} from './entity/order.entity';
import {OrderController} from './order.controller';
import {OrderService} from './order.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	imports: [TypeOrmModule.forFeature([Order])],
	exports: [TypeOrmModule],
})
export class OrderModule {}
