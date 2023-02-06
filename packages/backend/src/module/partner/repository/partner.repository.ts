/**Import start*/
import * as _ from 'lodash';
import {EntityRepository, Repository} from 'typeorm';
import {UpdatePartnerDto} from '../dto/partner.dto';
import {Partner} from '../entity/partner.entity';

@EntityRepository(Partner)
export class PartnerRepository extends Repository<Partner> {
	async updatePartner(
		id: number,
		updatePartnerDto: UpdatePartnerDto
	): Promise<Partner | null> {
		const result = await this.findOne({id});
		if (!result) return null;

		_(updatePartnerDto).forEach((val, key) => {
			if (val) result[key] = val;
		});
		return this.save(result);
	}

	async getAllPartners(): Promise<Partner[]> {
		return await this.find();
	}
}
