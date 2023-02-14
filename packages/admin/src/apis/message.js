import {axios} from '../config/axios';

export const getMessageListApi = (params) => axios.get('/message/list', {params});

export const removeMessageById = (id) => axios.post(`/message/${id}/remove`);

export const restoreMessageById = (id) => axios.post(`/message/${id}/restore`);
