import "./style/style.css"
import GameCard from "../../components/Cards/GameCard"
import Header from "../../components/header"
import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { getGames } from "../../services/games/getGames"
import { searchGames } from "../../services/games/searchGames"

export default function Home(){

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);
    const [hasNext, setHasNext] = useState(null);
    const [hasPrev, setHasPrev] = useState(null);
    const [totalGames, setTotalGames] = useState(0);
    const [filters, setFilters] = useState({
        platforms: [],
        genres: [],
        developers: [],
        year: null,
        ordering: null
    })

    useEffect(() => {
        setPageNumber(1);
    }, [searchParams, filters]);

    useEffect(() => {
        async function fetchGames() {
            try {
                setLoading(true);
                const querySearch = searchParams.get('search');

                let response;
                
                if (querySearch) {
                    response = await searchGames(querySearch, pageNumber, filters);
                } else {
                    response = await getGames(pageNumber, filters);
                }

                setGames(response.data.results);
                setTotalGames(response.data.count);
                setHasNext(response.data.next);
                setHasPrev(response.data.previous);

            } catch ( err ) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } fetchGames();
    }, [searchParams, pageNumber, filters]);

    

    const handleSearch = (searchTerm) => {
        navigate(`?search=${searchTerm}`);
    }

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    }

    const handlePageRight = () => {
        if (hasNext) setPageNumber(pageNumber + 1);
    }

    const handlePageLeft = () => {
        if (hasPrev) setPageNumber(pageNumber - 1);
    }
    

    if (loading) return <p>Carregando...</p>
    if (error) return <p>Error: {error}</p>

    return(
        
        <>
            <Header onSearch={handleSearch} onFilterChange={handleFilterChange} initialFilters={filters} showFilters={true}/>

            <div className="resultadoPesquisa"><h3>{searchParams.get('search') == null ? "" : `${totalGames} Resultados para: ${searchParams.get('search')}`}</h3></div>
            

            <div className="pai-cards">
                      {games.map((game) => (
                            <GameCard id={game.id} gameImg={game.background_image} gameName={game.name} stores={game.stores}/>
                      ))}
            </div>

            <button onClick={handlePageLeft}>Menos Página</button> <button onClick={handlePageRight}>Mais Página</button>
        </>
    )
}