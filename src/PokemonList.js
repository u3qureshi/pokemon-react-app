import React from "react";
import "./PokemonList.css";

function PokemonList({ pokemonNames }) {
  //pokemon variable here is an array of pokemon names
  return (
    <div className="pokemonNamesContainer">
      {pokemonNames.map((p) => (
        <div className="pokemonNames">{p.name.toUpperCase()}</div>
      ))}
    </div>
  );
}

export default PokemonList;
