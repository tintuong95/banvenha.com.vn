import * as moment from 'moment';
import {Between, Like} from 'typeorm';

export const findOptionWhere = (query: any, fieldSearch: string[]): any => {
	const newQuery = {...query};

	fieldSearch.forEach((item) => {
		if (newQuery[item]) newQuery[item] = Like(`%${newQuery[item]}%`);
	});

	if (newQuery.start && newQuery.end) {
		const startTime = moment(newQuery.start, 'YYYY-MM-DD').toISOString();
		const endTime = moment(newQuery.end, 'YYYY-MM-DD').toISOString();
		newQuery['created_at'] = Between(startTime, endTime);
	}

	delete newQuery.perPage;
	delete newQuery.currentPage;
	delete newQuery.start;
	delete newQuery.end;

	return newQuery;
};
