import { useState, useEffect } from "react";
import PokeAPI from "./components/PokeAPI";
import "./index.css";

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=649";

  // Number of pokemons used in a single game
  const setSize = 20;

  // A subset of pokemons with details
  const [pokemonsDetails, setPokemonsDetails] = useState([]);

  useEffect(() => {
    console.log(pokemonsDetails);
  }, [pokemonsDetails]);

  return (
    <>
      <main>
        <PokeAPI
          url={url}
          setSize={setSize}
          setPokemonsDetails={setPokemonsDetails}
        />
      </main>
    </>
  );
}

export default App;
