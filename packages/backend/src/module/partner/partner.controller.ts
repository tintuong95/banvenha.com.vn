import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Post,
	Put,
	ValidationPipe,
	HttpStatus,
	HttpCode,
} from '@nestjs/common';
import {PartnerService} from './partner.service';
import {CreatePartnerDto, UpdatePartnerDto} from './dto/partner.dto';
import {Partner} from './entity/partner.entity';

@Controller('partner')
export class PartnerController {
	constructor(private partnerService: PartnerService) {}
	@Get('')
	async getAllPartners(): Promise<any> {
		return await this.partnerService.getAllPartners();
	}
	@Get(':id')
	async getPartnerDetails(
		@Param('id', ParseIntPipe) id: number
	): Promise<Partner> {
		return await this.partnerService.getPartnerDetails(id);
	}

	@Post('')
	@HttpCode(HttpStatus.CREATED)
	async createPartner(
		@Body() createPartnerDto: CreatePartnerDto
	): Promise<Partner> {
		return await this.partnerService.createPartner(createPartnerDto);
	}

	@Put(':id')
	async updatePartner(
		@Body(ValidationPipe) updatePartnerDto: UpdatePartnerDto,
		@Param('id', ParseIntPipe) id: number
	): Promise<Partner> {
		return await this.partnerService.updatePartner(id, updatePartnerDto);
	}

	@Delete(':id')
	async removePartner(@Param('id', ParseIntPipe) id: number): Promise<string> {
		return await this.partnerService.removePartner(id);
	}
}
