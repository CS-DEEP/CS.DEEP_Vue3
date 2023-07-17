import axios from 'axios'
import CONST from '@/global/const/index.ts'
import type {AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults} from 'axios'


// 导出Request，可以用来自定义传递配置来创建实例
export class Request {
    // axios 实例
    instance: AxiosInstance
    // 基础配置，url和超时时间（异步方法可能不只需要 1s 的调用时间，这里改成了 3min
    baseConfig: AxiosRequestConfig = {
        baseURL: 'http://localhost:3000',
        timeout: 180000,
    }

    constructor(config: AxiosRequestConfig) {
        const mergedConfig = {
            ...(this.baseConfig as CreateAxiosDefaults),
            ...config,
        };
        // 使用axios.create创建axios实例，配置为基础配置和我们传递进来的配置
        this.instance = axios.create(mergedConfig as CreateAxiosDefaults);

        this.instance.interceptors.request.use(
            async (config: AxiosRequestConfig) => {
                if (config.url.includes('login') || config.url.includes('register') || config.url.includes('reset')) {
                    return config;
                }
                const token = localStorage.getItem('token');
                const expirationTime = localStorage.getItem('expirationTime');
                config.headers!['token'] = `${token}`;

                // 判断token是否过期
                const currentDate = new Date();
                const expirationDate = new Date(expirationTime);

                if (!token || expirationDate < currentDate) {
                    localStorage.clear();
                    window.location.href = '/login';
                }
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
    ): Promise<AxiosResponse<T>> {
        return this.instance.get(url);
    }

    public post<T = any>(
        url: string,
        data?: any,
    ): Promise<AxiosResponse<T>> {
        return this.instance.post(url, data);
    }
}
