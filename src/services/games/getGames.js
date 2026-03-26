import { AxiosWithoutAuthToken } from "../config";

export const getGames = async (pageNumber, filters = {}) => {
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;
    let url = `/games?key=${apiKey}&page=${pageNumber}`;

    if (filters.genres && filters.genres.length > 0) {
        url += `&genres=${filters.genres.join(',')}`;
    }
    if (filters.platforms && filters.platforms.length > 0) {
        url += `&platforms=${filters.platforms.join(',')}`;
    }
    if (filters.developers && filters.developers.length > 0) {
        url += `&developers=${filters.developers.join(',')}`;
    }
    if (filters.year) {
        url += `&year_start=${filters.year}&year_end=${filters.year}`;
    }
    if (filters.ordering) {
        url += `&ordering=${filters.ordering}`;

        if (filters.ordering.includes('rating') || filters.ordering.includes('metacritic')) {
            url += `&metacritic=1,100`;
        }
    }

    const response = await AxiosWithoutAuthToken().get(url);

    return {
        status: response.status,
        data: response.data,
    }
}