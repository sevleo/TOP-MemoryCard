import { useState, useEffect } from "react";
import PokeAPI from "./components/PokeAPI";
import Gameboard from "./components/Gameboard";
import Button from "./components/Button";
import "./index.css";
import generateRandomPokemonSet from "./components/generateRandomPokemonSet";
import ScoreCounter from "./components/ScoreCounter.jsx";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=649";
  const [fetchData, setFetchData] = useState(true);

  // Number of pokemons used in a single game
  const setSize = 60;

  // Number of pokemons displayed in a round
  const roundSize = 8;

  // A subset of pokemons for the game
  // Stripped
  const [gamePokemonSet, setGamePokemonSet] = useState([]);

  // A subset of pokemons for the current round
  const [roundPokemonSet, setRoundPokemonSet] = useState([]);

  const [roundScoreCount, setRoundScoreCount] = useState(0);
  const [gameScoreCount, setGameScoreCount] = useState(0);

  // Generate a subset of pokemons for the first round
  useEffect(() => {
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
    if (roundPokemonSet[0] !== undefined) setDrawBoardAllowed(true);
  }, [roundPokemonSet]);

  // Controlling start game
  const [showGameboard, setShowGameboard] = useState(false);

  // Controlling buttons
  const [showButtons, setShowButtons] = useState(true);

  const startGame = () => {
    setShowGameboard(true);
    setClickable(true);
    setShowButtons(false);
    setRoundScoreCount(0);
  };

  const logPokemons = () => {
    console.log(gamePokemonSet);
    console.log(roundPokemonSet);
  };

  // Controlling when cards are clickable
  const [clickable, setClickable] = useState(false);

  return (
    <>
      <main>
        <div className="mb-2.5 flex h-24 items-center justify-center gap-2">
          {showButtons ? (
            <>
              <Button onClick={startGame} buttonName="Start Game" />
              {/* <Button onClick={logPokemons} buttonName="Log" /> */}
            </>
          ) : null}
          <div className="counters">
            <ScoreCounter
              roundScore={roundScoreCount}
              gameScore={gameScoreCount}
            />
          </div>
        </div>

        <PokeAPI
          url={url}
          setSize={setSize}
          setGamePokemonSet={setGamePokemonSet}
          fetchData={fetchData}
        />
        {drawBoardAllowed ? (
          <Gameboard
            roundPokemonSet={roundPokemonSet}
            showGameboard={showGameboard}
            setShowGameboard={setShowGameboard}
            clickable={clickable}
            setClickable={setClickable}
            gamePokemonSet={gamePokemonSet}
            roundSize={roundSize}
            setSize={setSize}
            setRoundPokemonSet={setRoundPokemonSet}
            setShowButtons={setShowButtons}
            setFetchData={setFetchData}
            fetchData={fetchData}
            roundScoreCount={roundScoreCount}
            setRoundScoreCount={setRoundScoreCount}
            gameScoreCount={gameScoreCount}
            setGameScoreCount={setGameScoreCount}
          />
        ) : null}
      </main>
    </>
  );
}

export default App;
