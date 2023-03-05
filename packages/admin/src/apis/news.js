import {axios} from '../config/axios';

export const getBlogListApi = (params) => axios.get('/blog/list', {params});

export const getBlogGroupApi = () => axios.get('/blogGroup/list');

export const removeBlogById = (id) => axios.post(`/blog/${id}/remove`);

export const restoreBlogById = (id) => axios.post(`/blog/${id}/restore`);

export const updateBlogStatusByAdmin = (id, status) => {
	return axios.post(`/blog/${id}/status`, {status});
};

export const updateBlogtState = (id, published) =>
	axios.post(`/blog/${id}/update`, {
		published,
	});

export const createBlogApi = (data) => axios.post(`/blog/create`, data);


export const getBlogDetailsApi = (id) => axios.get(`/blog/${id}/details`);


export const updateBlog = (id, data) => axios.post(`/blog/${id}/update`, data);


export const countBlogApi = () => axios.get(`/blog/count`);
