import { AxiosWithoutAuthToken } from "../config";

export const getGames = async () => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const response = await AxiosWithoutAuthToken().get(`/games?key=${apiKey}`);

    return {
        status: response.status,
        data: response.data,
    }
}