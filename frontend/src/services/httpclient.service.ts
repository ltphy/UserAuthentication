import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import * as H from 'history';
import HttpStatusCode from 'http-status-codes';
import CookieNames from '../constants/cookie.constants';
import Cookie from './cookie.service';

class HttpClientService {
    public static history: H.History | null = null;

    public static get instance() {
        return this._instance || (this._instance = this.create());
    }

    private static _instance: AxiosInstance;

    //getHeaders: headers contain token
    public static async httpGet<T>(requestUri: string, config: AxiosRequestConfig = {}): Promise<T> {
        return this.instance.get<any, AxiosResponse<T>>(requestUri, {
            ...config,
            headers: this.getHeaders()
        }).then((res: AxiosResponse<T>): Promise<T> => {
            return this.handleAxiosResponse<T>(res);
        });
    };

    //getHeaders: headers contain token
    // public static async httpPost<T>(requestUri: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
    //     return this.instance.post<any, AxiosResponse<T>>(requestUri, data, {
    //         ...config,
    //         headers: this.getHeaders()
    //     }).then((res: AxiosResponse<T>): Promise<T> => {
    //         return this.handleAxiosResponse<T>(res);
    //     }).catch((reason:AxiosError<T>):Promise<T> => {
    //         if(reason.response){
    //             return this.handleAxiosResponse<T>( reason.response);
    //         }
    //         throw (reason);
    //     });
    // };
    public static async httpPost<T>(requestUri: string, data: any, config: AxiosRequestConfig = {}){
        try
            {const result = await this.instance.post<any, AxiosResponse<T>>(requestUri, data, {
                ...config,
                headers: this.getHeaders()
            });
            return this.handleAxiosResponse<T>(result);
        }
        catch(reason){
            if(reason.response){
                return this.handleAxiosResponse<T>( reason.response);
            }
            throw (reason);
        }
    };
    //getHeaders: headers contain token
    public static async httpPut<T>(requestUri: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.instance.put<any, AxiosResponse<T>>(requestUri, data, {
            ...config,
            headers: this.getHeaders()
        }).then((res: AxiosResponse<T>): Promise<T> => {
            return this.handleAxiosResponse<T>(res);
        });
    };

    //getHeaders: headers contain token
    public static async httpDelete<T>(requestUri: string, data: any, config: AxiosRequestConfig = {}): Promise<T> {
        return this.instance.delete<any, AxiosResponse<T>>(requestUri, {
            ...config,
            headers: this.getHeaders()
        }).then((res: AxiosResponse<T>): Promise<T> => {
            return this.handleAxiosResponse<T>(res);
        });
    };

    public static fetch(url: string) {
        const token = Cookie.getCookie(CookieNames.TOKEN) || "";
        return fetch(url, {
            method: 'GET',
            headers: {
                Authorization: token
            },
        }).then(res => {
            return this.handleResponse(res);
        })
    };

    //create an instance => to handle method
    private static create(): AxiosInstance {
        //create a headers /url/ timeout
        const headers = {'Content-Type': 'application/json'};
        const requestConfig = {headers};
        const instance = axios.create(requestConfig);
        //use interceptors what is this =>>
        //ranging from 200 return response, outside range of 2xx return response error
        instance.interceptors.response.use((response): AxiosResponse => response,
            (error: any): any => {
                //dosth with reponse error
                if (error.response) {
                    //need to access response
                    return Promise.reject(error);
                }
                throw(error);
                // return error.response;
            });
        //the request intercepter do sth before request is sent
        //do sth with the response data =>
        return instance;
    };

//this is to check the validity (user-token from email) set the token to header => to send to server
    private static getHeaders(paramsTokens?: string) {
        //set paramtoken (validing from server or get from cookie)

        const token = paramsTokens || Cookie.getCookie(CookieNames.TOKEN);
        return {
            ...this._instance.defaults.headers, [process.env.REACT_APP_TOKEN_HEADER_KEY as string]: token
        }
    }

    private static deleteAuthCookie() {
        Cookie.deleteCookie(CookieNames.TOKEN);
        Cookie.deleteCookie(CookieNames.USER_INFO);
    }

    //to validate the reponse
    private static handleAxiosResponse<T>(res: AxiosResponse<T>): Promise<T> {
        if (res.status === HttpStatusCode.UNAUTHORIZED) {
            if (this.history) {
                this.deleteAuthCookie();
                this.history.push('/sign-up');
            }
            throw res && res.data ? res.data : res;
        }
        if (res.status >= HttpStatusCode.BAD_REQUEST && res.status <= 599) {
            throw res && res.data ? res.data : res;
        }
        return Promise.resolve<T>(res.data);
    };


    //to validate the reponse
    private static handleResponse(res: Response): Promise<Response> {
        //unauthorizd
        if (res.status === HttpStatusCode.UNAUTHORIZED) {
            if (this.history) {
                this.deleteAuthCookie();
                this.history.push('/sign-up');
            }
            throw res;
        }
        if (res.status >= HttpStatusCode.BAD_REQUEST && res.status <= 599) {
            throw res;
        }
        return Promise.resolve(res);
    };
}


export default HttpClientService;