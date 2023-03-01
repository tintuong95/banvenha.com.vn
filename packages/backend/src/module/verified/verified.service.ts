import {Injectable, UnauthorizedException} from '@nestjs/common';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {SignInDto, SignUpDto} from './dto/verified.dto';
import {Verified} from './entity/verified.entity';
import {Repository} from 'typeorm';
import * as _ from 'lodash';
import {
	instanceToInstance,
	instanceToPlain,
	plainToInstance,
} from 'class-transformer';
import {ACCOUNT_RELATION} from '~contants/relation';
import {AccountChildService} from '~module/account/auth/account.auth.service';
import {CreateAccountDto} from '~module/account/dto/account.dto';

@Injectable()
export class VerifiedService {
	constructor(
		@InjectRepository(Verified)
		private verifiedRepository: Repository<Verified>,
		private accountChildService: AccountChildService
	) {}

	async signUp(signUpDto: SignUpDto): Promise<Verified> {
		const {password, username} = signUpDto;
		const newAccount = plainToInstance(CreateAccountDto, signUpDto);
		const createAccount = await this.accountChildService.createAccount(
			newAccount
		);
		const newVerified = {password, username, accountId: createAccount.id};
		const verified = this.verifiedRepository.create(newVerified);
		const {id} = await this.verifiedRepository.save(verified);

		const result = await this.verifiedRepository.findOne({
			where: {id},
			relations: [ACCOUNT_RELATION],
		});
		return instanceToInstance(result);
	}

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

	async signIn(signInDto: SignInDto): Promise<any> {
		const {username, password} = signInDto;
		const result = await this.verifiedRepository.findOne({
			where: {username},
			relations: [ACCOUNT_RELATION],
		});

		if (!result)
			throw new NotFoundException('Account ' + username + ' Not Found !');
		else if (result && result.comparePassword(password)) {
			return instanceToPlain(result);
		}

		throw new UnauthorizedException('Password Wrong !');
	}
}
