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
            <div className="parallax-image" style={{ backgroundImage: 'url()' }}>
                <div className="overlay"></div>
            </div>
            <Header />
            <div className="infos">
                <div className="header">
                    <div className="plataformas">
                        <FaPlaystation size={20} />
                        <FaXbox />
                        <FaSteam />
                        <div className="dev-pub">
                            <p>Ubisoft</p>
                            <p>Ubisoft</p>
                        </div>
                    </div>
                </div>
                <main>
                    <img src={capa} />
                    <p>Assassin's Creed Black Flag</p>
                    <p>2013</p>
                    <p>Jogo de piratinha que vira assassino, vulgo Edward Kenway</p>
                    <p>Ação e Aventura</p>
                    <p>8/10</p>
                    <p>12h</p>
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
