import axios from 'axios';

const service = axios.create({
    timeout: 5000,
    baseURL:  'http://localhost:8080',
    withCredentials:  true
});

service.interceptors.request.use(config=>{
    console.log("config",config)
    return config;
},err=>{
    console.log(err);
    return Promise.reject();
}
)

service.interceptors.response.use(
    response=>{
        if(response.status==200){
            return response.data;
        }
        else{
            Promise.reject();
        }
    },
    error=>{
        console.log(error);
        return Promise.reject();
    }
)

export default service;