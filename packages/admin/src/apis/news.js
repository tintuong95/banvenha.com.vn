import axios from 'axios';

export const newsListApi = () => axios.get('/news/list');

newsListApi.
