import { AxiosWithoutAuthToken } from "../config";

export const getGamesByGenres = async (genreIds, limit = 10) => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    
    if (!genreIds || genreIds.length === 0) {
        return { status: 200, data: { results: [] } };
    }

    const genresString = genreIds.join(',');
    const response = await AxiosWithoutAuthToken().get(
        `/games?key=${apiKey}&genres=${genresString}&page_size=${limit}&ordering=-rating`
    );

    return {
        status: response.status,
        data: response.data,
    }
}
