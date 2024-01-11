import { useState, useEffect } from "react";
import CardGetter from "./components/CardGetter";
import "./index.css";

function App() {
  const getPokemonsUrl = "https://pokeapi.co/api/v2/pokemon/?limit=649";

  // Number of pokemons used in a single game
  const pokemonGameSetSize = 20;

  // All pokemons from API
  const [pokemons, setPokemons] = useState([]);

  // A subset of pokemons picked randomly for a given game
  const [pokemonGameSet, setPokemonGameSet] = useState([]);

  // A subset of pokemons with details
  const [pokemonsDetails, setPokemonsDetails] = useState([]);

  // Fetch all pokemons from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlResponse = await fetch(getPokemonsUrl);
        const pokemonData = await urlResponse.json();
        setPokemons(pokemonData.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // When pokemons are fetched, select random pokemons for the game
  useEffect(() => {
    const pokemonGameSetIndices = [];
    while (pokemonGameSetIndices.length < pokemonGameSetSize) {
      const randomDecimal = Math.random();
      const randomNumber = Math.floor(randomDecimal * 649);
      if (!pokemonGameSetIndices.includes(randomNumber)) {
        pokemonGameSetIndices.push(randomNumber);
      }
    }

    const newPokemonGameSet = pokemonGameSetIndices.map(
      (index) => pokemons[index],
    );

    setPokemonGameSet(newPokemonGameSet);
  }, [pokemons]);

  // When random pokemons are selected, fetch details about them
  useEffect(() => {
    const fetchPokemonData = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    };

    // Fetch data
    const fetchData = async () => {
      const promises = [];
      if (pokemonGameSet) {
        pokemonGameSet.forEach((pokemon) => {
          if (pokemon) {
            promises.push(fetchPokemonData(pokemon.url));
          }
        });
      }

      const pokemonDataArray = await Promise.all(promises);

      // Strip data
      const newPokemonsDetails = [];
      pokemonDataArray.forEach((pokemon) => {
        const newPokemonDetails = {
          name: "",
          image: "",
        };
        newPokemonDetails.name = pokemon.name;
        newPokemonDetails.image =
          pokemon.sprites.other.dream_world.front_default;
        newPokemonsDetails.push(newPokemonDetails);
      });

      setPokemonsDetails(newPokemonsDetails);
    };

    fetchData();
  }, [pokemonGameSet]);

  // When details about pokemons are available...
  useEffect(() => {
    console.log(pokemonsDetails);
  }, [pokemonsDetails]);

  return (
    <>
      <main>
        <CardGetter />
      </main>
    </>
  );
}

export default App;
