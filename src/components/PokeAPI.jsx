import { useEffect, useState } from "react";

export default function PokeAPI({
  getPokemonsUrl,
  gameSetSize,
  setPokemonsDetails,
}) {
  // Number of pokemons used in a single game
  const pokemonGameSetSize = gameSetSize;

  // All pokemons from API
  const [pokemons, setPokemons] = useState([]);

  // A subset of pokemons picked randomly for a given game
  const [pokemonGameSet, setPokemonGameSet] = useState([]);

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
  }, [getPokemonsUrl]);

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

  return <div className="card-getter"></div>;
}
