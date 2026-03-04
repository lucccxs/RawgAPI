import GameCard from "./components/Cards/"
import Home from "./Templates/Home"

function App() {
  return(
    <>
      <Home/>
      <div className="pai-cards">
        <GameCard/>
        <GameCard/>
        <GameCard/>
        <GameCard/>
      </div>
    </>

  )
}

export default App
