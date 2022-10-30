import axios, {AxiosResponse} from "axios";
import CryptToken from '../../model/cryptToken';

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

interface respStructure
{
    data:CryptToken[],
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

const CryptoTokens = 
{
    list: () => request.get<respStructure>('/assets'),
    details: (id:string) => request.get<respStructure>(`/assetes/${id}`)
}

const agent = {
    CryptoTokens
}

export default agent;