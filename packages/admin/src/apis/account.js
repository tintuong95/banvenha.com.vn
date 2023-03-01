import {axios} from '../config/axios';

export const getAccountListApi = (params) => axios.get('/admin/list', {params});

export const removeAccountById = (id) => axios.post(`/admin/${id}/remove`);

export const restoreAccountById = (id) => axios.post(`/admin/${id}/restore`);


export const updateStatusAccountById = (id) => axios.post(`/admin/${id}/status`);
