import axios from 'axios'
import {ResponseResult} from './type'
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults} from 'axios'


// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance
    // 基础配置，url和超时时间
    baseConfig: AxiosRequestConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 1000
    }

    constructor(config: AxiosRequestConfig) {
        const mergedConfig = {
            ...(this.baseConfig as CreateAxiosDefaults),
            ...config
        };
        // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
        this.instance = axios.create(mergedConfig as CreateAxiosDefaults);

        this.instance.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                return config;
            },
            (err: any) => {
                // 请求错误，这里可以用全局提示框进行提示
                return Promise.reject(err);
            }
        );

        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                // 直接返回res，当然你也可以只返回res.data
                // 系统如果有自定义code也可以在这里处理
                return res;
            },
            (err: any) => {
                // 这里用来处理http常见错误，进行全局提示
                let message = "";
                switch (err.response.status) {
                    case 400:
                        message = "请求错误(400)";
                        break
                    case 403:
                        message = "拒绝访问(403)";
                        break;
                    case 404:
                        message = "请求出错(404)";
                        break;
                    case 408:
                        message = "请求超时(408)";
                        break;
                    case 500:
                        message = "服务器错误(500)";
                        break;
                    case 502:
                        message = "网络错误(502)";
                        break;
                    case 503:
                        message = "服务不可用(503)";
                        break;
                    case 504:
                        message = "网络超时(504)";
                        break;
                    case 505:
                        message = "HTTP版本不受支持(505)";
                        break;
                    default:
                        message = `连接出错(${err.response.status})!`;
                }
                console.log(message)
                return Promise.reject(err.response);
            }
        );
    };

    // 定义请求方法
    public get<T = any>(
        url: string,
        config?: axios.AxiosRequestConfig
    ): Promise<AxiosResponse<ResponseResult<T>>> {
        return this.instance.get(url, config);
    }

    public post<T = any>(
        url: string,
        data?: any,
        config?: axios.AxiosRequestConfig
    ): Promise<AxiosResponse<ResponseResult<T>>> {
        return this.instance.post(url, data, config);
    }
}