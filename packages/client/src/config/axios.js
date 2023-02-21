import axios from 'axios';

const enviromentServer = typeof window !== 'undefined' ? true : false;

const instance = axios.create({
	baseURL: enviromentServer ? 'http://localhost:5000' : '' + '/v1/api',
});

instance.defaults.timeout = 2500;

// Add a request interceptor
instance.interceptors.request.use(
	function (config) {
		const token = 'Bearer ' + localStorage.getItem('accessToken');
		config.headers.Authorization = enviromentServer ? '' : token;
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export {instance as axios};
