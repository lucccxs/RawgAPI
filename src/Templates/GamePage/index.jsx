import capa from "../../assets/Imagem/jogo.jpeg"
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Header from "../../components/header";
import Recomendado from "../../components/Cards/recomedacao";
import { useRef } from "react";
import "./style/style.css"

export default function GamePage({ nome, ano, dev, desc, genero, pub, metacritic, tempo, avaliacoes, recomendacoes }) {

    const carrossel = useRef(null)

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
            <div className="parallax-image" style={{ backgroundImage: `url(${capa})` }}>
            <div className="overlay"></div>
        </div>
            <Header />
            <div className="infos">
                <div className="cover">
                    <img src={capa} />
                </div>
                <main>
                    <div className="desc">
                        <div className="infos-principais">
                            <p className="titulo">Assassin's Creed Black Flag</p>
                            <p>2013</p>
                        </div>
                        <p>Jogo de piratinha que vira assassino, vulgo Edward Kenway</p>
                        <div className="plataformas">
                            <FaPlaystation size={20} />
                            <FaXbox />
                            <FaSteam />
                        </div>
                        <div className="infos-adicionais">
                            <p>Ação e Aventura</p>
                            <p>Nota: 8/10</p>
                            <p>Duração: 12h</p>
                        </div>
                        <div className="dev-pub">
                            <p>Developer: Ubisoft</p>
                            <p>Publisher: Ubisoft</p>
                        </div>
                    </div>
                </main>
            </div>
            <div className="recomendados">
                <h4>Recomendações</h4>
                <div className="carrossel">
                    <button className="seta-esquerda" onClick={handleLeftClick}>
                        <IoIosArrowBack />
                    </button>
                    <div className="recomendacoes" ref={carrossel}>
                        <Recomendado />
                        <Recomendado />
                        <Recomendado />
                        <Recomendado />
                        <Recomendado />
                        <Recomendado />
                        <Recomendado />
                    </div>
                    <button className="seta-direita" onClick={handleRightClick}>
                        <IoIosArrowForward />
                    </button>
                </div>
            </div>
        </div>
    )
}
