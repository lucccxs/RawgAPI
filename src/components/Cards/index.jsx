import "./style/style.css"

export default function GameCard({gameImg, gameName, releaseDate, devImg, platformsImg}) {
    return (
        <>
            <div className="cards">
                <div className="imagem-jogo"> 
                    <img src={gameImg}/>
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
