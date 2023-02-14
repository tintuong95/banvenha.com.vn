import {Request} from 'express';

export function pagination(
	req: Request,
	data: any,
	currentPage: number,
	perPage: number
) {
	const totalPage: number = Math.ceil(Number(data[1] / perPage));
	const {currentLink, previousLink, nextLink, links} = paginationLinks(
		req,
		data,
		currentPage,
		perPage
	);
	if (currentPage > totalPage) {
		return null;
	}
	return {
		meta: {
			currentPage,
			from: currentPage * perPage - perPage + 1,
			to: currentPage * perPage - perPage + data[0].length,
			perPage,
			total: data[1],
			currentLink,
			previousLink,
			nextLink,
			lastPage: totalPage,
		},
		data: data[0],
		links,
	};
}

function paginationLinks(
	req: Request,
	data: any,
	currentPage: number,
	perPage: number
) {
	// eslint-disable-next-line prefer-const
	let links: any = [];
	const url = getUrlRequest(req);
	const totalPage = Math.ceil(Number(data[1] / perPage));

	const nextLink =
		currentPage < totalPage
			? url + '?' + mapQuery(req.query, currentPage + 1)
			: url + '?' + mapQuery(req.query, currentPage);
	const previousLink =
		currentPage - 1 > 0
			? url + '?' + mapQuery(req.query, currentPage - 1)
			: url + '?' + mapQuery(req.query, currentPage);

	for (let i = 1; i <= totalPage; i++) {
		links.push(url + '?' + mapQuery(req.query, i));
	}
	return {
		nextLink: nextLink,
		links,
		previousLink: previousLink,
		currentLink: url + '?' + mapQuery(req.query, currentPage),
	};
}

function getUrlRequest(req: Request) {
	const protocol = req.protocol;
	const host = req.headers.host;
	const path = req.path;
	return protocol + '://' + host + path;
}

function mapQuery(query, currentPage) {
	return Object.entries(query)
		.map((item) => {
			if (item[0] === 'currentPage') {
				item[1] = currentPage;
			}
			return `${item[0]}=${item[1]}`;
		})
		.join('&');
}

export function handleQuery(query: any) {
	const {currentPage = 1, perPage = 10} = query;
	const skip = +perPage * +currentPage - +perPage;
	return {
		skip,
		take: perPage,
		currentPage: +currentPage,
		perPage: +perPage,
	};
}
