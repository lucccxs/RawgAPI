import { AxiosWithoutAuthToken } from "../config";

export const searchGames = async (searchTerm, pageNumber) => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    const response = await AxiosWithoutAuthToken().get(`/games?key=${apiKey}&search=${searchTerm}&page=${pageNumber}`);

    return {
        status: response.status,
        data: response.data,
    }
}
