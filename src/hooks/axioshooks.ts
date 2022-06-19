import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL: string = process.env.REACT_APP_API_KEY || "https://localhost:5001/api";

const axiosConfig: AxiosRequestConfig = {
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
};

export default function useAxios() {
    const client: AxiosInstance = axios.create(axiosConfig);

    client.interceptors.request.use(config => {
        const token = window.localStorage.getItem("jwt");

        if (token != null) {
            if (!config.headers) config.headers = { };
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });

    return client;
}
