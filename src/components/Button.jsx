export default function Button({ onClick, buttonName }) {
  function handleButtonClick() {
    onClick();
  }
  return (
    <button className="bg-sky-600" onClick={handleButtonClick}>
      {buttonName}
    </button>
  );
}
