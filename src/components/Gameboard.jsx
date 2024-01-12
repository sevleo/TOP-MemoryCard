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
      console.log(gamePokemonSet);
      clickedPokemon.selected = true;
      setShowGameboard(false);
      setClickable(false);
      console.log(clickedPokemon);

      // Add one not selected and not seen
      let newPokemons = gamePokemonSet.filter((item) => {
        return item.selected === false && item.seen === false;
      });

      // If there are no more not seen, add remaining not selected
      if (newPokemons.length === 0) {
        newPokemons = gamePokemonSet.filter((item) => {
          return item.selected === false && item.seen === true;
        });
      }

      if (newPokemons.length > 0) {
        const randomNewCards = generateRandomPokemonSet(
          1,
          newPokemons.length,
          newPokemons
        );

        // Add 1 "selected"
        const selectedPokemons = gamePokemonSet.filter((item) => {
          return item.selected && !randomNewCards.includes(item) === true;
        });

        const randomSelectedCards = generateRandomPokemonSet(
          1,
          selectedPokemons.length,
          selectedPokemons
        );

        // Add 6 "seen"
        const seenPokemons = gamePokemonSet.filter((item) => {
          return (
            (item.seen === true || item.selected === true) &&
            !randomSelectedCards.includes(item) & !randomNewCards.includes(item)
          );
        });

        const randomSeenCards = generateRandomPokemonSet(
          6,
          seenPokemons.length,
          seenPokemons
        );

        const newRoundPokemonSetCombined = randomSeenCards.concat(
          randomNewCards,
          randomSelectedCards
        );

        const shuffledPokemonSet = [...newRoundPokemonSetCombined];
        for (let i = shuffledPokemonSet.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledPokemonSet[i], shuffledPokemonSet[j]] = [
            shuffledPokemonSet[j],
            shuffledPokemonSet[i],
          ];
        }

        setRoundPokemonSet(shuffledPokemonSet);
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
