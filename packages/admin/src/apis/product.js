import {axios} from '../config/axios';

export const getProductListApi = (params) =>
	axios.get('/product/list', {params});

export const getProductGroupApi = () => axios.get('/productGroup/list');

export const removeProductById = (id) => axios.post(`/product/${id}/remove`);

export const updateProductStatusByAdmin = (id, status) => {
	return axios.post(`/product/${id}/status`, {status});
};

export const updateProductState = (id, state) =>
	axios.post(`/product/${id}/update`, {
		state,
	});
