import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getGameById } from "../../services/games/getGameById";
import Header from "../../components/header";
import Recomendado from "../../components/Cards/recomedacao";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "./style/style.css"

export default function GamePage() {
    const { id } = useParams(); // Pega o ID da URL
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const carrossel = useRef(null);

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

    const handleRightClick = () => {

        const container = carrossel.current
        const cardWidth = container.children[0].offsetWidth + 20
        const maxScroll = container.scrollWidth - container.offsetWidth

        if (container.scrollLeft >= maxScroll) {
            container.scrollLeft = 0
        } else {
            container.scrollBy({
                left: cardWidth,
                behavior: "smooth"
            })
        }
    }

    const handleLeftClick = () => {

        const container = carrossel.current
        const cardWidth = container.children[0].offsetWidth + 20

        if (container.scrollLeft <= 0) {
            container.scrollLeft = container.scrollWidth
        } else {
            container.scrollBy({
                left: -cardWidth,
                behavior: "smooth"
            })
        }
    }

    return (
        <div className="parallax">
            <div className="parallax-image" style={{ backgroundImage: `url(${game.background_image})` }}>
            <div className="overlay"></div>
        </div>
            <Header />
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
                                <FaPlaystation size={20} />
                                <FaXbox />
                                <FaSteam />
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
                    <div className="imdb">
                        <p>{game.metacritic}</p>
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
                        {game.related_games && game.related_games.length > 0 ? (
                            game.related_games.map((rec) => (
                                <Recomendado 
                                    id={rec.id}
                                    gameImg={rec.background_image}
                                />
                            ))
                        ) : (
                            <p>Nenhuma recomendação disponível</p>
                        )}
                    </div>
                    <button className="seta-direita" onClick={handleRightClick}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    )
}
