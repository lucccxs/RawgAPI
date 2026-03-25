import { AxiosWithoutAuthToken } from "../config";

export const getDevelopers = async () => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const response = await AxiosWithoutAuthToken().get(`/developers?key=${apiKey}`);

    return {
        status: response.status,
        data: response.data,
    }
}
