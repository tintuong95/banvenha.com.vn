export const getNewsList = async (params) => {

		const newParams = new URLSearchParams(params);
		const result = await fetch(
			'http://localhost:5000/v1/api/blog/list?' + newParams
		);

		return result.json();

};

export const getGroupNewsList = async () => {
	const resutl = await fetch('http://localhost:5000/v1/api/blogGroup/list');
	return resutl.json();
};

export const getNewsDetails = async (slug) => {
	const result = await fetch(
		`http://localhost:5000/v1/api/blog/${slug}/slug/details`
	);
	return result.json();
};
