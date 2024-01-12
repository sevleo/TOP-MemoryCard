export default function Card({ keyValue, name, image }) {
  return (
    <div
      key={keyValue}
      className="flex h-64 w-56 flex-col items-center justify-center bg-slate-400"
    >
      <p>{name}</p>
      <img src={image} className="h-44 w-44 object-fill" />
    </div>
  )
}
