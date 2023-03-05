import {axios} from '../config/axios';

export const getAccountListApi = (params) => axios.get('/account/list', {params});

export const removeAccountById = (id) => axios.post(`/account/${id}/remove`);

export const restoreAccountById = (id) => axios.post(`/account/${id}/restore`);


export const updateStatusAccountById = (id) => axios.post(`/account/${id}/status`);


export const updateAccount = (id, data) => axios.post(`/account/${id}/update`, data);

export const getAccountById = (id) => axios.get(`/account/${id}/details`);