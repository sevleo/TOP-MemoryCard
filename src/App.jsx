import { useState, useEffect } from "react";
import CardGetter from "./components/CardGetter";
import "./index.css";

function App() {
  const pokemonGameSetSize = 20;

  // All pokemons from API
  const [pokemons, setPokemons] = useState([]);

  // A subset of pokemons picked randomly for a given game
  const [pokemonGameSet, setPokemonGameSet] = useState([]);

  const getPokemonsUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50";

  useEffect(() => {
    const pokemonGameSetIndices = [];
    while (pokemonGameSetIndices.length < pokemonGameSetSize) {
      const randomDecimal = Math.random();
      const randomNumber = Math.floor(randomDecimal * 50);
      if (!pokemonGameSetIndices.includes(randomNumber)) {
        pokemonGameSetIndices.push(randomNumber);
      }
    }

    const newPokemonGameSet = pokemonGameSetIndices.map(
      (index) => pokemons[index],
    );

    setPokemonGameSet(newPokemonGameSet);
    console.log(newPokemonGameSet);
  }, [pokemons]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlResponse = await fetch(getPokemonsUrl);
        const pokemonData = await urlResponse.json();
        console.log(pokemonData.results);
        setPokemons(pokemonData.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <main>
        <CardGetter />
      </main>
    </>
  );
}

export default App;
