export default function Button({ onClick }) {
  function handleButtonClick() {
    onClick()
  }
  return <button onClick={handleButtonClick}>Start Game</button>
}
