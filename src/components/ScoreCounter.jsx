export default function ScoreCounter({ roundScore, gameScore }) {
  return (
    <div>
      <div>Current score: {roundScore}</div>
      <div>Best score: {gameScore}</div>
    </div>
  );
}
