export type ResponseResult<T> = {
    code: number;
    message: string;
    data: T;
}

