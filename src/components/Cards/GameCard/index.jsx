import "./style/style.css"
import { useNavigate } from "react-router-dom"
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";

export default function GameCard({id, gameImg, gameName, stores}) {
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
                        {stores?.some(s => s.store.name.toLowerCase().includes('playstation')) && <FaPlaystation size={20} />}
                        {stores?.some(s => s.store.name.toLowerCase().includes('xbox')) && <FaXbox size={20} />}
                        {stores?.some(s => s.store.name.toLowerCase().includes('steam')) && <FaSteam size={20} />}
                        {stores?.some(s => s.store.name.toLowerCase().includes('epic')) && <SiEpicgames size={20}/>}
                        {stores?.some(s => {
                          const name = s.store.name.toLowerCase();
                          return name.includes('nintendo') || name.includes('wii');
                        }) && <BsNintendoSwitch size={20}/>}                                    
                    </div>
                </div>
            </div>
        </>
    )
}
