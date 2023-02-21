export const getProductList = async (params) => {
	const newParams = new URLSearchParams(params);
	const result = await fetch('http://localhost:5000/v1/api/product/list?' + newParams);

	return result.json();
};

export const getGroupProductList = async () => {
	const resutl = await fetch('http://localhost:5000/v1/api/productGroup/list');
	return resutl.json();
};

export const getProductDetails = async (slug) => {
	const result = await fetch(
		`http://localhost:5000/v1/api/product/${slug}/slug/details`
	);
	return result.json();
};
