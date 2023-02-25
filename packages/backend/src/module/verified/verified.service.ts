import {Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {
	CreateVerifiedDto,
	SignInVerifiedDto,
	UpdateVerifiedDto,
} from './dto/verified.dto';
import {Verified} from './entity/verified.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {ADMIN_KEY} from '~contants/relation';
import {instanceToInstance, instanceToPlain} from 'class-transformer';

@Injectable()
export class VerifiedService {
	constructor(
		@InjectRepository(Verified)
		private verifiedRepository: Repository<Verified>
	) {}

	// async getAllVerifieds(): Promise<any> {
	// 	return await this.verifiedRepository.find();
	// }

	// async getVerifiedDetails(id: string): Promise<Verified | any> {
	// 	const result = await this.verifiedRepository.findOne({
	// 		where: {id},
	// 	});
	// 	if (!result)
	// 		throw new NotFoundException('Verified Id ' + id + ' Not Found !');
	// 	return result;
	// }

	async signUp(createVerifiedDto: CreateVerifiedDto): Promise<Verified> {
		const verified = this.verifiedRepository.create(createVerifiedDto);
		const {id} = await this.verifiedRepository.save(verified);
		const result = await this.verifiedRepository.findOne({
			where: {id},
			// relations: [ADMIN_KEY],
		});
		return instanceToInstance(result);
	}

	// async updateVerified(
	// 	id: number,
	// 	updateVerifiedDto: UpdateVerifiedDto
	// ): Promise<Verified | any> {
	// 	const result = await this.verifiedRepository.findOne({where: {id}});
	// 	if (!result)
	// 		throw new NotFoundException('Verified Id ' + id + ' Not Found !');

	// 	_(updateVerifiedDto).forEach((val, key) => {
	// 		if (val) result[key] = val;
	// 	});
	// 	return this.verifiedRepository.save(result);
	// }

	async removeVerified(id: string): Promise<string> {
		const result = await this.verifiedRepository.softDelete(id);
		if (result.affected > 0)
			return 'Removed verified Id ' + id + ' successfully !';
		throw new NotFoundException('Verified Id ' + id + ' Not Found !');
	}

	async restoreVerified(id: string): Promise<string> {
		const result = await this.verifiedRepository.restore(id);
		if (result.affected > 0)
			return 'Restored verified Id ' + id + ' successfully !';
		throw new NotFoundException('Verified Id ' + id + ' Not Found !');
	}

	async deleteVerified(id: string): Promise<string> {
		const result = await this.verifiedRepository.delete(id);
		if (result.affected > 0)
			return 'Deleted verified Id ' + id + ' successfully !';
		throw new NotFoundException('Verified Id ' + id + ' Not Found !');
	}

	async signIn(signInVerifiedDto: SignInVerifiedDto): Promise<any> {
		const {username, password} = signInVerifiedDto;
		const result = await this.verifiedRepository.findOne({
			where: {username},
			// relations: [ADMIN_KEY],
		});

		if (!result)
			throw new NotFoundException('Account ' + username + ' Not Found !');
		else if (result && result.comparePassword(password)) {
			return instanceToPlain(result);
		}

		throw new UnauthorizedException('Password Wrong !');
	}
}
