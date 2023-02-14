import {axios} from '../config/axios';

export const getNewsListApi = (params) => axios.get('/news/list', {params});

export const getNewsGroupApi = () => axios.get('/newsGroup/list');

export const removeNewsById = (id) => axios.post(`/news/${id}/remove`);

export const updateNewsStatusByAdmin = (id, status) => {
	return axios.post(`/news/${id}/status`, {status});
};

export const updateNewstState = (id, state) =>
	axios.post(`/news/${id}/update`, {
		state,
	});

export const createNewsApi = (data) => axios.post(`/news/create`, data);


export const getNewsDetailsApi = (id) => axios.get(`/news/${id}/details`);


export const updateNews = (id, data) => axios.post(`/news/${id}/update`, data);
