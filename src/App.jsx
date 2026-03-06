import GamePage from "./Templates/GamePage"
import Home from "./Templates/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          
          <Route path="/games" element= {<GamePage/>}></Route>
          <Route 
            path="/"
            element={<Home/>}
          />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
