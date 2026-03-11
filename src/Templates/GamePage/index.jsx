import capa from "../../assets/Imagem/jogo.jpeg"
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import Header from "../../components/header";
import Recomendado from "../../components/Cards/recomedacao";
import "./style/style.css"


export default function GamePage({nome, ano, dev, desc, genero, pub, metacritic, tempo, avaliacoes, recomendacoes}){
    return(
        <div className="parallax">
            <div className="parallax-image" style={{backgroundImage: 'url()'}}>
                <div className="overlay"></div>
            </div>
            <Header/>
            <div className="infos">
                <div className="header">
                    <div className="plataformas">
                        <FaPlaystation size={20}/>
                        <FaXbox/>
                        <FaSteam/>
                        <div className="dev-pub">
                            <p>Ubisoft</p>
                            <p>Ubisoft</p>
                        </div>
                    </div>
                </div>
                <main>
                    <img src={capa}/>
                    <p>Assassin's Creed Black Flag</p>
                    <p>2013</p>
                    <p>Jogo de piratinha que vira assassino e é fodão, vulgo Edward Kenway</p>
                    <p>Ação e Aventura</p>
                    <p>8/10</p>
                    <p>12h</p>
                </main>
                    <div className="recomendados">
                        <h4>Recomendações</h4>
                        <div className="recomendacoes">
                            <Recomendado/>
                            <Recomendado/>
                            <Recomendado/>
                            <Recomendado/>
                        </div>
                    </div>
                </div>
            </div>

    )
}