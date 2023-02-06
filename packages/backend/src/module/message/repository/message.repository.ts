/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdateMessageDto} from '../dto/message.dto';

import {Message} from '../entity/message.entity';

/**Import end*/

@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {
	/**
	 *  @Param {number} id
	 *  @Param {updateMessageDto} UpdateMessageDto
	 *  @Return {Message} Message || null
	 */
	async updateMessage(
		id: number,
		updateMessageDto: UpdateMessageDto
	): Promise<Message | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updateMessageDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllMessages(): Promise<Message[]> {
		return await this.find();
	}
}
