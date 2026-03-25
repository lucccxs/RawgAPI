import "./style/style.css"
import { useNavigate } from "react-router-dom"

export default function Recomendado ({ id, gameImg, gameName }) {
    const navigate = useNavigate()
    function handleClick(){
        navigate(`/game/${id}`)
    }

    return (
        <>
            <div className="cards-recomendado" onClick={handleClick}>
                <div className="imagem-jogo-recomendado">
                    <img src={gameImg} alt={gameName} />
                </div>
                <hr />
            </div>
        </>
    )
}
