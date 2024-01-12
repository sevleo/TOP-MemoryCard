import { useState, useEffect } from "react"
import PokeAPI from "./components/PokeAPI"
import Gameboard from "./components/Gameboard"
import Button from "./components/Button"
import "./index.css"

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=649"

  // Number of pokemons used in a single game
  const setSize = 20

  // A subset of pokemons with details
  const [pokemonsDetails, setPokemonsDetails] = useState([])

  // Log pokemonDetails for testing
  useEffect(() => {
    console.log(pokemonsDetails)
  }, [pokemonsDetails])

  const [showGameboard, setShowGameboard] = useState(false)

  const startGame = () => {
    setShowGameboard(true)
  }

  return (
    <>
      <main>
        <div className="mb-2.5 h-24">
          <Button onClick={startGame} />
        </div>
        <PokeAPI
          url={url}
          setSize={setSize}
          setPokemonsDetails={setPokemonsDetails}
        />
        {/* {showGameboard ? <Gameboard pokemons={pokemonsDetails} /> : null} */}
        <Gameboard pokemons={pokemonsDetails} showGameboard={showGameboard} />
      </main>
    </>
  )
}

export default App
