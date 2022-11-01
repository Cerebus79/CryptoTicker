import axios, {AxiosResponse} from "axios";
import CryptToken from '../../model/cryptToken';
import ExchangeStruct from "../../model/exchangeStruct";

const API_URL:string = 'https://api.coincap.io/v2';

axios.defaults.baseURL = API_URL;

/*const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}


axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})*/

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
   // post: <T>(url : string, body: {}) => axios.post<T>(url, body).then(responseBody),
   // put: <T>(url : string, body: {}) => axios.put<T>(url, body).then(responseBody),
   // delete: <T>(url : string) => axios.delete<T>(url).then(responseBody),
}

const CryptoApiData = 
{
    list: () => request.get<respTokenStructure>('/assets'),
    details: (id:string) => request.get<respTokenStructure>(`/assetes/${id}`),
    exchanges: () => request.get<respExchStructure>('/exchanges')
   
}

const agent = {
    CryptoApiData
}

export default agent;