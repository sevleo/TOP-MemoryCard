import { useEffect, useState } from "react";
import generateRandomPokemonSet from "./generateRandomPokemonSet";

export default function PokeAPI({ url, setSize, setGamePokemonSet }) {
  // All pokemons from API
  const [pokemonsCatalog, setPokemonsCatalog] = useState([]);

  // A subset of pokemons picked randomly for a given game
  // Unstripped
  const [gamePokemonSetUnstripped, setGamePokemonSetUnstripped] = useState([]);

  // Fetch all pokemons from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlResponse = await fetch(url);
        const pokemonData = await urlResponse.json();
        setPokemonsCatalog(pokemonData.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  // When pokemonsCatalog are fetched, select random pokemons for the game
  useEffect(() => {
    const newPokemonGameSet = generateRandomPokemonSet(
      setSize,
      649,
      pokemonsCatalog
    );
    setGamePokemonSetUnstripped(newPokemonGameSet);
  }, [pokemonsCatalog, setSize]);

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
      if (gamePokemonSetUnstripped) {
        gamePokemonSetUnstripped.forEach((pokemon) => {
          if (pokemon) {
            promises.push(fetchPokemonData(pokemon.url));
          }
        });
      }

      // Details about pokemons
      const pokemonDataArray = await Promise.all(promises);

      // Strip data
      const gamePokemonSetStripped = [];
      pokemonDataArray.forEach((pokemon) => {
        const newPokemonDetails = {
          seen: false,
          selected: false,
          key: Math.random(),
          name: "",
          image: "",
        };
        newPokemonDetails.name = pokemon.name;
        newPokemonDetails.image =
          pokemon.sprites.other.dream_world.front_default;
        gamePokemonSetStripped.push(newPokemonDetails);
      });

      // Return data to App.jsx
      setGamePokemonSet(gamePokemonSetStripped);
    };

    fetchDetailsData();
  }, [gamePokemonSetUnstripped, setGamePokemonSet]);
}
