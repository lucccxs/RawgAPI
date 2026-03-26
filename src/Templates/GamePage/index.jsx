import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getGameById } from "../../services/games/getGameById";
import { getGamesByGenres } from "../../services/games/getGamesByGenres";
import Header from "../../components/header";
import Recomendado from "../../components/Cards/recomendacao";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SiEpicgames } from "react-icons/si";
import { BsNintendoSwitch } from "react-icons/bs";
import "./style/style.css"

export default function GamePage() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [recommendedGames, setRecommendedGames] = useState([]);
    const carrossel = useRef(null)


   const handleRightClick = () => {
    const container = carrossel.current
    if (!container || !container.children.length) return

    const style = window.getComputedStyle(container)
    const gap = parseInt(style.gap) || 0
    const cardWidth = container.children[0].offsetWidth + gap

    container.scrollBy({
        left: cardWidth,
        behavior: "smooth"
    })
}

    const handleLeftClick = () => {
    const container = carrossel.current
    if (!container || container.scrollLeft <= 0) return

    const style = window.getComputedStyle(container)
    const gap = parseInt(style.gap) || 0
    const cardWidth = container.children[0].offsetWidth + gap

    container.scrollBy({
        left: -cardWidth,
        behavior: "smooth"
    })
}   

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
        // Rela a página para o topo sempre que o ID mudar
        window.scrollTo(0, 0);

        async function fetchGame() {
            try {
                setLoading(true);
                setError(null);
                
                const { data } = await getGameById(id);
                setGame(data);

                // Buscar recomendações baseadas nos gêneros
                if (data.genres && data.genres.length > 0) {
                    const genreIds = data.genres.map(g => g.id);
                    try {
                        const recommendedRes = await getGamesByGenres(genreIds, 20);
                        
                        const filtered = recommendedRes.data.results
                            .filter(g => String(g.id) !== String(id)).
                            sort((a, b) => (b.metacritic || 0) - (a.metacritic || 0))
                            .slice(0, 10);
                        setRecommendedGames(filtered);
                    } catch (recErr) {
                        console.error("Erro ao buscar recomendações:", recErr);
                    }
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            fetchGame();
        }
    }, [id]);

    if (loading) return <div className="loading"><h1>Carregando...</h1></div>
    if (error) return <div className="error"><h1>Erro: {error}</h1></div>
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
                                <p>Duração: {game.playtime == 0 ? "N/A" : `${game.playtime}h`}</p>
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
                <h4>Recomendações</h4>
                <div className="carrossel">
                    <button className="seta-esquerda" onClick={handleLeftClick}>
                        <IoIosArrowBack />
                    </button>
                    <div className="recomendacoes" ref={carrossel}>
                        {recommendedGames.map(r => (
                            r.rating > 0 && (
                            <Recomendado 
                                key={r.id} 
                                id={r.id} 
                                gameImg={r.background_image} 
                                gameName={r.name}
                            />
                        )
                        ))}
                    </div>
                    <button className="seta-direita" onClick={handleRightClick}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    )
}


