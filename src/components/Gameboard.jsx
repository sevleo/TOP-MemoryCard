import Card from "./Card";
import generateRandomPokemonSet from "./generateRandomPokemonSet";

export default function Gameboard({
  roundPokemonSet,
  showGameboard,
  setShowGameboard,
  clickable,
  setClickable,
  gamePokemonSet,
  setRoundPokemonSet,
}) {
  roundPokemonSet.forEach((pokemon) => {
    pokemon.seen = true;
  });

  function handleCardClick(clickedPokemon) {
    if (clickable) {
      clickedPokemon.selected = true;
      setShowGameboard(false);
      setClickable(false);
      console.log(clickedPokemon);

      // Add 7 "seen"
      const seenPokemons = gamePokemonSet.filter((item) => {
        return item.seen === true;
      });

      const randomSeenCards = generateRandomPokemonSet(
        7,
        seenPokemons.length,
        seenPokemons
      );

      // Add one not selected and not seen
      const newPokemons = gamePokemonSet.filter((item) => {
        return item.selected === false && item.seen === false;
      });
      if (newPokemons.length > 0) {
        const randomNewCards = generateRandomPokemonSet(
          1,
          newPokemons.length,
          newPokemons
        );
        const newRoundPokemonSetCombined =
          randomSeenCards.concat(randomNewCards);
        console.log(newRoundPokemonSetCombined);

        setRoundPokemonSet(newRoundPokemonSetCombined);
        setShowGameboard(true);
        setClickable(true);
      } else {
        console.log("no more pokemons! you beat the game");
      }
    }
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 ">
        {roundPokemonSet.map((pokemon) => (
          <Card
            key={pokemon.key}
            name={pokemon.name}
            image={pokemon.image}
            showGameboard={showGameboard}
            clickable={clickable}
            onClick={() => handleCardClick(pokemon)}
          />
        ))}
      </div>
    </>
  );
}
