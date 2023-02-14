import {axios} from '../config/axios';

export const getOrderListApi = (params) => axios.get('/order/list', {params});

export const getOrderGroupApi = () => axios.get('/orderGroup/list');

export const removeOrderById = (id) => axios.post(`/order/${id}/remove`);

export const restoreRestoreById = (id) => axios.post(`/order/${id}/restore`);


