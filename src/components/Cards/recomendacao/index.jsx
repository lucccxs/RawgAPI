import "./style/style.css"
import { useNavigate } from "react-router-dom"

export default function Recomendado ({ id, gameImg, gameName }) {
    const navigate = useNavigate()
    
    function handleClick(){
        if (id) {
            navigate(`/game/${id}`)
        }
    }

    return (
        <>
            <div className="cards-recomendado" onClick={handleClick} style={{cursor: 'pointer'}}>
                <div className="imagem-jogo-recomendado">
                    <img 
                        src={gameImg || '/placeholder.png'} 
                        alt={gameName || 'Game'} 
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/250x150?text=Sem+Imagem';
                        }}
                    />
                    <div className="overlay-nome">
                        <h3>{gameName}</h3>
                    </div>
                </div>
                <hr />
            </div>
        </>
    )
}
