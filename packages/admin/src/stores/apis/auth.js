import {axios} from '../../config/axios';


export const loginApi= (data)=>{
    return axios.post('/auth/login', data);
}

