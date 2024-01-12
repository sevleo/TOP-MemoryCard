export default function Button({ onClick, buttonName }) {
  function handleButtonClick() {
    onClick();
  }
  return <button onClick={handleButtonClick}>{buttonName}</button>;
}
