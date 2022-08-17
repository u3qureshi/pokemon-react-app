import React from "react";
import "./PokemonList.css";

function PokemonList({ setIsHomepage, pokemonNames, isHomepage, setPokemon }) {
  function handleClick(e) {
    let pokemonName = e.target.innerText.toLowerCase();
    setPokemon(pokemonName);
    setIsHomepage(false);
  }

  //pokemon variable here is an array of pokemon names
  if (isHomepage) {
    return (
      <div className="pokemonNamesContainer">
        {pokemonNames.map((p) => (
          <div onClick={handleClick} className="pokemonNames">
            {p.name.toUpperCase()}
          </div>
        ))}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default PokemonList;
