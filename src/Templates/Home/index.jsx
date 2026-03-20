import "./style/style.css"
import GameCard from "../../components/Cards/GameCard"
import Header from "../../components/header"
import { useEffect, useState } from "react"
import { getGames } from "../../services/games/getGames"

export default function Home(){

    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchGames() {
            try {
                setLoading(true);
                const {data} = await getGames();
                setGames(data.results);
            } catch ( err ) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        } fetchGames();
    }, []);

    if (loading) return <p>Carregando...</p>
    if (error) return <p>Error: {error}</p>

    return(
        
        <>
            <Header/>

            <div className="pai-cards">
                      {games.map((game) => (
                            <GameCard id={game.id} gameImg={game.background_image} gameName={game.name}/>
                      ))}
            </div>
        </>
    )
}