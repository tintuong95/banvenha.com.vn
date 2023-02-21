export const getNewsList = async (params) => {
	const newParams = new URLSearchParams(params);
	const result = await fetch(
		'http://localhost:5000/v1/api/news/list?' + newParams
	);

	return result.json();
};

export const getGroupNewsList = async () => {
	const resutl = await fetch('http://localhost:5000/v1/api/newsGroup/list');
	return resutl.json();
};

export const getNewsDetails = async (slug) => {
	const result = await fetch(
		`http://localhost:5000/v1/api/news/${slug}/slug/details`
	);
	return result.json();
};
