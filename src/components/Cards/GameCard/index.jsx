import "./style/style.css"
import jogo from "../../../assets/Imagem/jogo.jpeg"
import { useNavigate } from "react-router-dom"
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";


export default function GameCard({id, gameImg, gameName, releaseDate, devImg, platformsImg}) {
    const navigate = useNavigate()
    function handleClick({id}){
        navigate(`/games`)
    }

    return (
        <>
            <div className="cards" onClick={handleClick}>
                <div className="imagem-jogo">
                    <img src = {jogo} />
                </div>
                <hr />
                <div className="info-jogo">
                    <img platformsImg/>
                    <h2>Assassin's Creed Black Flag</h2>
                     <div className="plataformas">
                        <FaPlaystation size={20} />
                        <FaXbox />
                        <FaSteam />                                            
                    </div>
                    <img devImg/>
                </div>
            </div>
        </>
    )
}
