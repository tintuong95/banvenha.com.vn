import {Like} from 'typeorm';

export const findOptionWhere = (query: any, fieldSearch: string[]): any => {
	const newQuery = {...query};

	delete newQuery.perPage;
	delete newQuery.currentPage;

	fieldSearch.forEach((item) => {
		if (newQuery[item]) newQuery[item] = Like(`%${newQuery[item]}%`);
	});

	return newQuery;
};
