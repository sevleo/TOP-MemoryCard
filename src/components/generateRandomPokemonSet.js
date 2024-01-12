export default function generateRandomPokemonSet(
  setSize,
  maxValue,
  originalPokemonSet
) {
  const randomIndices = []

  // Generate random indices
  while (randomIndices.length < setSize) {
    const randomDecimal = Math.random()
    const randomNumber = Math.floor(randomDecimal * maxValue)
    if (!randomIndices.includes(randomNumber)) {
      randomIndices.push(randomNumber)
    }
  }
  // Return pokemons matching random indices
  return randomIndices.map((index) => originalPokemonSet[index])
}
