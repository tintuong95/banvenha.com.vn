import {axios} from '../config/axios';

export const getPaymentListApi = (params) =>
	axios.get('/payment/list', {params});

export const getPaymentDetailsApi = (id) => axios.get(`/payment/${id}/details`);

export const removePaymentById = (id) => axios.post(`/payment/${id}/remove`);

export const restorePaymentById = (id) => axios.post(`/payment/${id}/restore`);
