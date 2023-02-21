import {axios} from '../config/axios';

export const getProductListApi = (params) =>
	axios.get('/product/list', {params});

export const getProductGroupApi = () => axios.get('/productGroup/list');

export const removeProductById = (id) => axios.post(`/product/${id}/remove`);

export const restoreProductById = (id) => axios.post(`/product/${id}/restore`);

export const updateProductStatusByAdmin = (id, status) => {
	return axios.post(`/product/${id}/status`, {status});
};

export const updateProductState = (id, state) =>
	axios.post(`/product/${id}/update`, {
		state,
	});

export const createProduct = (data) => axios.post(`/product/create`, data);

export const getProductDetails = (id) => axios.get(`/product/${id}/details`);

export const updateProduct = (id, data) =>
	axios.post(`/product/${id}/update`, data);

export const countProductApi = () => axios.get(`/product/count`);

export const getViewsLikesApi = () => axios.get(`/product/informations`);
