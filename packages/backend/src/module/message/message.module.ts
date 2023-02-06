import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageController} from './message.controller';
import {MessageService} from './message.service';
import {Message} from './entity/message.entity';

@Module({
	controllers: [MessageController],
	providers: [MessageService],
	imports: [TypeOrmModule.forFeature([Message])],
	exports: [TypeOrmModule],
})
export class MessageModule {}
