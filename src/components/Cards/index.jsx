import "./style/style.css"
import jogo from "../../assets/Imagem/jogo.jpeg"
import { useNavigate } from "react-router-dom"

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
                    <h3>29/10/2013</h3>
                    <img devImg/>
                </div>
            </div>
        </>
    )
}
