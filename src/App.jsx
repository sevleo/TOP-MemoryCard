import { useState, useEffect } from "react";
import CardGetter from "./components/CardGetter";
import "./index.css";

function App() {
  const getPokemonsUrl = "https://pokeapi.co/api/v2/pokemon/?limit=1025";

  const [pokemons, setPokemons] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlResponse = await fetch(getPokemonsUrl);
        const urlData = await urlResponse.json();
        setPokemons(urlData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (pokemons) {
      console.log(pokemons);
    }
  }, [pokemons]);

  return (
    <>
      <main>
        <CardGetter />
      </main>
    </>
  );
}

export default App;
