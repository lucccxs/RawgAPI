import "./style/style.css"
import jogo from "../../../assets/Imagem/jogo.jpeg"
import { useNavigate } from "react-router-dom"
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function GameCard({id, gameImg, gameName}) {
    const navigate = useNavigate()
    function handleClick(){
        navigate(`/game/${id}`)
    }

    return (
        <>
            <div className="cards" onClick={handleClick}>
                <div className="imagem-jogo">
                    <img src = {gameImg} />
                </div>
                <hr />
                <div className="info-jogo">
                    <img platformsImg/>
                    <h2>{gameName}</h2>
                     <div className="plataformas">
                        <FaPlaystation size={20} />
                        <FaXbox />
                        <FaSteam />                                            
                    </div>
                </div>
            </div>
        </>
    )
}
