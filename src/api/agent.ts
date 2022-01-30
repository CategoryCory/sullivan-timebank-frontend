import axios, { AxiosError, AxiosResponse } from "axios";
import { store } from "../stores/store";
import { User, UserFormValues } from "../models/user";

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    })
};

axios.defaults.baseURL = "https://localhost:5001/api";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(500);
    return response;
}, (error: AxiosError) => {
    // const { data, status, config } = error.response!;
    // switch (status) {
    //     case 400:
    //         if (typeof data === "string") {
    //             toast.error(data);
    //         }
    //         if (config.method === "get" && data.errors.hasOwnProperty("id")) {
                
    //         }
    // }
});

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>("/account"),
    login: (user: UserFormValues) => requests.post<User>("/account/login", user),
    register: (user: UserFormValues) => requests.post<User>("/account/register", user),
}

const agent = {
    Account
}

export default agent;