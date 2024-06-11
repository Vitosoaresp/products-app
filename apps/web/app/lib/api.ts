import axios from 'axios';

export const BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// api.interceptors.response.use(
// 	response => response,
// 	error => {
// 		if (
// 			error.response?.status === 401 &&
// 			error.response?.data.error === 'Unauthorized'
// 		) {
// 			if (window.location) {
// 				window.location.href = '/sign-in';
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );
