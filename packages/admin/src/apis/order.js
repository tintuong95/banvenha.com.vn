import {axios} from '../config/axios';

export const getOrderListApi = (params) => axios.get('/order/list', {params});

export const getOrderDetailsApi = (id) => axios.get(`/order/${id}/details`);

export const removeOrderById = (id) => axios.post(`/order/${id}/remove`);

export const restoreRestoreById = (id) => axios.post(`/order/${id}/restore`);

export const getRevenueMonthApi = () => axios.get(`/order/revenue/month`);

export const getRevenueTotalApi = () => axios.get(`/order/revenue/total`);

export const updateStatusOrderApi = (id, status) =>
	axios.post(`/order/${id}/update`, {status});
