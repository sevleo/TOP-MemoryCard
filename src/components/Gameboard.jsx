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
  setShowButtons,
  setFetchData,
  fetchData,
  setRoundScoreCount,
  roundScoreCount,
  setGameScoreCount,
  gameScoreCount,
  roundSize,
}) {
  roundPokemonSet.forEach((pokemon) => {
    pokemon.seen = true;
  });

  function handleCardClick(clickedPokemon) {
    if (clickable) {
      if (clickedPokemon.selected === true) {
        // console.log("lost!");
        setFetchData(!fetchData);
        setShowButtons(true);
        setClickable(false);
        if (gameScoreCount < roundScoreCount) {
          setGameScoreCount(roundScoreCount);
        }
      } else {
        setRoundScoreCount(roundScoreCount + 1);
        clickedPokemon.selected = true;
        setShowGameboard(false);
        setClickable(false);

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
            2,
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

          // Add 4 "seen"
          const seenPokemons = gamePokemonSet.filter((item) => {
            return (
              (item.seen === true || item.selected === true) &&
              !randomSelectedCards.includes(item) &
                !randomNewCards.includes(item)
            );
          });

          const randomSeenCards = generateRandomPokemonSet(
            roundSize - 3,
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
          setTimeout(() => setClickable(true), 500);

          setRoundPokemonSet(shuffledPokemonSet);
        } else {
          // console.log("no more pokemons! you beat the game");
          setRoundScoreCount(roundScoreCount + 1);
          if (gameScoreCount < roundScoreCount) {
            setGameScoreCount(roundScoreCount + 1);
          }
          setFetchData(!fetchData);
          setShowButtons(true);
          setClickable(false);
        }
        setShowGameboard(true);
      }
    }
  }

  return (
    <>
      <div className="ml-auto mr-auto flex w-3/4 flex-wrap justify-center gap-2 ">
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
