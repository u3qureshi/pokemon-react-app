import React from "react";
import "./PokemonCardFooter.css";

function PokemonCardFooter({
  isHomepage,
  nextPokemonNumber,
  previousPokemonNumber,
  setPokemon,
}) {
  function handlePButtonClick(e) {
    setPokemon(previousPokemonNumber);
  }
  function handleNButtonClick(e) {
    setPokemon(nextPokemonNumber);
  }

  if (isHomepage) return <div></div>;
  else {
    return (
      <div className="card-button-container">
        <button
          className="left"
          onClick={handlePButtonClick}
          disabled={previousPokemonNumber == 0 ? true : false}
        >
          #{String(previousPokemonNumber).padStart(3, "0")}
        </button>
        <button
          className="right"
          onClick={handleNButtonClick}
          disabled={nextPokemonNumber == 906 ? true : false}
        >
          #{String(nextPokemonNumber).padStart(3, "0")}
        </button>
      </div>
    );
  }
}

export default PokemonCardFooter;
