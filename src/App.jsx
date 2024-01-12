import { useState, useEffect } from "react";
import PokeAPI from "./components/PokeAPI";
import Gameboard from "./components/Gameboard";
import Button from "./components/Button";
import "./index.css";
import generateRandomPokemonSet from "./components/generateRandomPokemonSet";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=649";

  // Number of pokemons used in a single game
  const setSize = 20;

  // Number of pokemons displayed in a round
  const roundSize = 8;

  // A subset of pokemons for the game
  // With details about pokemons
  const [gamePokemonSet, setGamePokemonSet] = useState([]);

  // A subset of pokemons for the current round
  const [roundPokemonSet, setRoundPokemonSet] = useState([]);

  // Generate a subset of pokemons for the first round
  useEffect(() => {
    console.log(gamePokemonSet);
    const newRoundPokemonSet = generateRandomPokemonSet(
      roundSize,
      setSize,
      gamePokemonSet
    );
    setRoundPokemonSet(newRoundPokemonSet);
  }, [gamePokemonSet]);

  // Log pokemon set for the current round to the console
  useEffect(() => {
    console.log(roundPokemonSet);
  }, [roundPokemonSet]);

  // Controlling start game
  const [showGameboard, setShowGameboard] = useState(false);

  const startGame = () => {
    setShowGameboard(true);
    setClickable(true);
  };

  // Controlling when cards are clickable
  const [clickable, setClickable] = useState(false);

  return (
    <>
      <main>
        <div className="mb-2.5 flex h-24 justify-center">
          <Button onClick={startGame} />
        </div>
        <PokeAPI
          url={url}
          setSize={setSize}
          setGamePokemonSet={setGamePokemonSet}
        />
        <Gameboard
          pokemons={gamePokemonSet}
          showGameboard={showGameboard}
          clickable={clickable}
        />
      </main>
    </>
  );
}

export default App;
