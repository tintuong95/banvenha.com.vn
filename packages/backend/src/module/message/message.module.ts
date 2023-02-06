import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {MessageController} from './message.controller';
import {MessageService} from './message.service';
import {MessageRepository} from './repository/message.repository';

@Module({
	controllers: [MessageController],
	providers: [MessageService],
	imports: [TypeOrmModule.forFeature([MessageRepository])],
	exports: [TypeOrmModule],
})
export class MessageModule {}
