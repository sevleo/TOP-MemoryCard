import Card from "./Card"

export default function Gameboard({ pokemons, showGameboard, clickable }) {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 ">
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.key}
            name={pokemon.name}
            image={pokemon.image}
            showGameboard={showGameboard}
            clickable={clickable}
          />
        ))}
      </div>
    </>
  )
}
