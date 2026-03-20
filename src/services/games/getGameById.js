import { AxiosWithoutAuthToken } from "../config";

export const getGameById = async (id) => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const response = await AxiosWithoutAuthToken().get(`/games/${id}?key=${apiKey}`);

    return {
        status: response.status,
        data: response.data,
    }
}
