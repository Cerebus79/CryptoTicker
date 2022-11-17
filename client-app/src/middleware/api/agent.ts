import axios, {AxiosError, AxiosResponse} from "axios";
import CryptToken from '../../model/cryptToken';
import ExchangeStruct from "../../model/exchangeStruct";
import { User, UserFormValues } from "../../model/user";
import { toast } from "react-toastify";
import { store } from "../../stores/store";
import { useNavigate } from "react-router";


const API_URL:string = 'https://api.coincap.io/v2';
let API_URL_ACCT:string = 'http://localhost:5187/api';

process.env.NODE_ENV==='production' ? API_URL_ACCT = 'https://cryptoapi-apim.azure-api.net/api' :  API_URL_ACCT = 'http://localhost:5187/api'

axios.defaults.baseURL = API_URL;

/*const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

*/
axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if(token) config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    
    return response;

}, (error: AxiosError) => {
    let navigate = useNavigate();
const {status, config} = error.response!;  
let data;
if (axios.isAxiosError(error) && error.response) {
	data = error.response.data;}

switch (status){
    case 400:
        if(typeof data === 'string'){
            toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')){
            navigate('/not-found');
        }
        if (data.errors) {
            const modalStateErrors = [];
            for (const key in data.errors) {
                if (data.errors[key]) {
                    modalStateErrors.push(data.errors[key])
                }
            }
            throw modalStateErrors.flat();
        } 
        break;
    case 401:
        toast.error('unauthorised');
        break;
    case 404:
        navigate('/not-found');
        break;
    case 500:
        store.commonStore.setServerError(data);
        navigate('/server-error');
    break;
}

return Promise.reject(error);
})

interface respTokenStructure
{
    data:CryptToken[],
    timestamp: string
}

interface respExchStructure
{
    data:ExchangeStruct[],
    timestamp: string
    
}

const axiosRequestConfig = {method: 'GET',redirect:'follow'}

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url : string) => axios.get<T>(url,axiosRequestConfig).then(responseBody),
    post: <T>(url : string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url : string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url : string) => axios.delete<T>(url).then(responseBody),
}

const CryptoApiData = 
{
    list: () => request.get<respTokenStructure>('/assets'),
    details: (id:string) => request.get<respTokenStructure>(`/assets/${id}`),
    exchanges: () => request.get<respExchStructure>('/exchanges')
   
}

const AccountApi = 
{
    login: (user:UserFormValues) => request.post<User>(`${API_URL_ACCT}/account/login`, user)
   
}

const agent = {
    CryptoApiData,
    AccountApi
}

export default agent;