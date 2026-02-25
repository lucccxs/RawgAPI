export default function GameCard({gameImg, gameName, releaseDate, devImg, platformsImg}) {
    return (
        <>
            <img src={gameImg}/>
            <img src={platformsImg}/>
            <h3>{gameName}</h3>
            <h2>{releaseDate}</h2>
            <img src={devImg}/>
        </>
    )
}
