import { AxiosWithoutAuthToken } from "../config";

export const getPlatforms = async () => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const response = await AxiosWithoutAuthToken().get(`/platforms?key=${apiKey}`);

    return {
        status: response.status,
        data: response.data,
    }
}
