import { useEffect, useState } from "react";

export default function PokeAPI({ url, setSize, setPokemonsDetails }) {
  // All pokemons from API
  const [pokemons, setPokemons] = useState([]);

  // A subset of pokemons picked randomly for a given game
  const [pokemonGameSet, setPokemonGameSet] = useState([]);

  // Fetch all pokemons from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlResponse = await fetch(url);
        const pokemonData = await urlResponse.json();
        setPokemons(pokemonData.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  // When pokemons are fetched, select random pokemons for the game
  useEffect(() => {
    const randomIndices = [];

    // Generate random indices
    while (randomIndices.length < setSize) {
      const randomDecimal = Math.random();
      const randomNumber = Math.floor(randomDecimal * 649);
      if (!randomIndices.includes(randomNumber)) {
        randomIndices.push(randomNumber);
      }
    }

    const newPokemonGameSet = randomIndices.map((index) => pokemons[index]);

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
    const fetchDetailsData = async () => {
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

      // Return data to App.jsx
      setPokemonsDetails(newPokemonsDetails);
    };

    fetchDetailsData();
  }, [pokemonGameSet]);

  return <div className="card-getter"></div>;
}
