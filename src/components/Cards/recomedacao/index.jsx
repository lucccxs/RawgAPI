import "./style/style.css"
import jogo from "../../../assets/Imagem/jogo.jpeg"
import { useNavigate } from "react-router-dom"

export default function Recomendado ({id, gameImg, gameName, releaseDate, devImg, platformsImg}) {
    const navigate = useNavigate()
    function handleClick({id}){
        navigate(`/games`)
    }

    return (
        <>
            <div className="cards-recomendado" onClick={handleClick}>
                <div className="imagem-jogo-recomendado">
                    <img src = {jogo} />
                </div>
                <hr />
            </div>
        </>
    )
}
