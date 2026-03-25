import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGameById } from "../../services/games/getGameById";
import Header from "../../components/header";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";
import { BsNintendoSwitch } from "react-icons/bs";
import "./style/style.css"

export default function GamePage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSearch = (searchTerm) => {
        navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }

    const stripHtml = (html) => {
        if (!html) return "";
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || "";
    }

    useEffect(() => {
        async function fetchGame() {
            try {
                setLoading(true);
                const { data } = await getGameById(id);
                setGame(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchGame();
    }, [id]);

    if (loading) return <p>Carregando...</p>
    if (error) return <p>Erro: {error}</p>
    if (!game) return <p>Jogo não encontrado</p>

    return (
        <div className="parallax">
            <div className="parallax-image" style={{ backgroundImage: `url(${game.background_image})` }}>
            <div className="overlay"></div>
        </div>
            <Header onSearch={handleSearch} showFilters={false}/>
            <div className="infoPai">
                <div className="cover">
                    <img src={game.background_image} />
                </div>
                <div className="infos">
                    <main>
                        <div className="desc">
                            <div className="infos-principais">
                                <p className="titulo">{game.name}</p>
                                <p>{game.released}</p>
                            </div>
                            <p>{stripHtml(game.description)}</p>
                            <div className="plataformas">
                                {game.stores?.some(s => s.store.name.toLowerCase().includes('playstation')) && <FaPlaystation size={20} />}
                                {game.stores?.some(s => s.store.name.toLowerCase().includes('xbox')) && <FaXbox size={20} />}
                                {game.stores?.some(s => s.store.name.toLowerCase().includes('steam')) && <FaSteam size={20} />}
                                {game.stores?.some(s => s.store.name.toLowerCase().includes('epic')) && <SiEpicgames size={20}/>}
                                {game.stores?.some(s => {
                                    const name = s.store.name.toLowerCase();
                                    return ( name.includes('wii') || name.includes('nintendo'))
                                }) && <BsNintendoSwitch size={20}/>}    
                            </div>
                            <div className="infos-adicionais">
                                <p>{game.genres?.map(g => g.name).join(", ") || "N/A"}</p>
                                <p>Duração: {game.playtime}h</p>
                            </div>
                            <div className="dev-pub">
                                <p>Developer: {game.developers?.[0]?.name || "N/A"}</p>
                                <p>Publisher: {game.publishers?.[0]?.name || "N/A"}</p>
                            </div>
                        </div>
                    </main>
                    <div className="imdb" style={{borderColor: !game.metacritic ? "rgba(255, 255, 255, 0.3)" : (game.metacritic > 80 ? "green" : (game.metacritic > 60 ? "yellow" : "red"))} }>
                        <p>{game.metacritic || "N/A"}</p>
                    </div>
                </div>
            </div>
            <div className="recomendados">
                
            </div>
        </div>
    )
}


