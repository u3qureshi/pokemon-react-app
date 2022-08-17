import React from "react";
import "./PokemonList.css";

function PokemonList({ pokemonNames, isHomepage }) {
  //pokemon variable here is an array of pokemon names
  if (isHomepage) {
    return (
      <div className="pokemonNamesContainer">
        {pokemonNames.map((p) => (
          <div className="pokemonNames">{p.name.toUpperCase()}</div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default PokemonList;
