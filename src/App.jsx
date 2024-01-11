import { useState, useEffect } from "react";
import PokeAPI from "./components/PokeAPI";
import "./index.css";

function App() {
  return (
    <>
      <main>
        <PokeAPI />
      </main>
    </>
  );
}

export default App;
