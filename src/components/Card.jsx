export default function Card({
  keyValue,
  name,
  image,
  showGameboard,
  clickable,
  onClick,
}) {
  function handleClick() {
    onClick();
  }

  return (
    <div
      key={keyValue}
      onClick={handleClick}
      className="flex h-64 w-56 cursor-pointer flex-col items-center justify-center gap-2 rounded-md bg-slate-400 outline outline-rose-900 hover:outline hover:outline-amber-300"
    >
      <img
        src={image}
        className={`h-44 w-44 object-fill ${
          showGameboard && clickable ? "opacity-1" : "opacity-0"
        }`}
      />
      <p
        className={`${
          showGameboard && clickable ? "opacity-1" : "opacity-0"
        } text-xl`}
      >
        {name}
      </p>
    </div>
  );
}
