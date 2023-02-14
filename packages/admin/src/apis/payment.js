import {axios} from '../config/axios';

export const getPaymentListApi = (params) => axios.get('/payment/list', {params});

export const getPaymentGroupApi = () => axios.get('/paymentGroup/list');

export const removePaymentById = (id) => axios.post(`/payment/${id}/remove`);

export const restorePaymentById = (id) => axios.post(`/payment/${id}/restore`);


