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
  // Stripped
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

  const [drawBoardAllowed, setDrawBoardAllowed] = useState(false);

  // Allow board only when all pokemon data is initialized
  useEffect(() => {
    console.log(roundPokemonSet);
    if (roundPokemonSet[0] !== undefined) setDrawBoardAllowed(true);
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
        {drawBoardAllowed ? (
          <Gameboard
            pokemons={roundPokemonSet}
            showGameboard={showGameboard}
            clickable={clickable}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;
