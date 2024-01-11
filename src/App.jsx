import { useState, useEffect } from "react";
import PokeAPI from "./components/PokeAPI";
import "./index.css";

function App() {
  const getPokemonsUrl = "https://pokeapi.co/api/v2/pokemon/?limit=649";

  // Number of pokemons used in a single game
  const pokemonGameSetSize = 20;

  // A subset of pokemons with details
  const [pokemonsDetails, setPokemonsDetails] = useState([]);

  return (
    <>
      <main>
        <PokeAPI
          getPokemonsUrl={getPokemonsUrl}
          gameSetSize={pokemonGameSetSize}
          pokemonsDetails={pokemonsDetails}
          setPokemonsDetails={setPokemonsDetails}
        />
      </main>
    </>
  );
}

export default App;
