import axios from "axios";

const URL = "https://api.rawg.io/api";

const baseConfig = {
    baseURL: URL,
    signal: new AbortController().signal,
}

export const AxiosWithoutAuthToken = () => {
    const config = {
        ...baseConfig,
        timeout : 10000,
    }

    return axios.create(config);
}