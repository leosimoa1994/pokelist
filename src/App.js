import React, { useState, useEffect } from "react";
import "./App.css";
import ListPokemon from "./components/listPokemon";
import Top from "./components/top";

function App() {
  return (
    <div>
      <Top />
      <ListPokemon />
    </div>
  );
}

export default App;
