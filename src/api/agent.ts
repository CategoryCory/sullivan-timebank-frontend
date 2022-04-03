import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../stores/store";
import { User, UserFormValues, UserProfile } from "../models/user";
import { IJob } from "../models/job";
import { UserAverageRating } from "../models/userRating";
import { TokenBalance } from "../models/tokenTransactions";
import { Skill } from "../models/skill";

// const sleep = (delay: number) => {
//     return new Promise(resolve => {
//         setTimeout(resolve, delay);
//     })
// };

axios.defaults.baseURL = process.env.REACT_APP_API_KEY || "https://localhost:5001/api";

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) {
        if (!config.headers) config.headers = {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

axios.interceptors.response.use(async response => {
    // await sleep(500);
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            if (typeof data === "string") {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("Unauthorized");
            break;
    }
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

const Profile = {
    getProfileById: (userId: string) => {
        return requests.get<UserProfile>(`/userprofile/${userId}`);
    },
    updateProfileById: (userId: string, userProfile: UserProfile) => {
        return requests.put<UserProfile>(`/userprofile/${userId}`, userProfile);
    }
}

const Jobs = {
    getAllJobs: () => requests.get<IJob[]>("/jobs"),
    getJobById: (id: string) => requests.get<IJob>(`/jobs/${id}`),
}

const Ratings = {
    getAverageRating: (userId: string) => requests.get<UserAverageRating>(`/userratings/${userId}`),
}

const TokenTransactions = {
    getTotalTokens: (userId: string) => requests.get<TokenBalance>(`/tokentransactions/balance/${userId}`),
}

const Skills = {
    getSkills: (searchString?: string) => requests.get<Skill[]>(`/userskills${searchString == null ? "" : `?searchString=${searchString}`}`),
    addSkillRange: (skillsToAdd: Skill[]) => requests.post<Skill[]>("/userskills", skillsToAdd),
}

const agent = {
    Account,
    Profile,
    Jobs,
    Ratings,
    TokenTransactions,
    Skills,
}

export default agent;