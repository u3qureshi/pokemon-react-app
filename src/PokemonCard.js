import React from "react";
import "./PokemonCard.css";

function PokemonCard({
  isHomepage,
  pokemon,
  pokemonType,
  pokemonHeightM,
  pokemonWeightKG,
  pokemonImg,
  pokemonNumber,
  pokemonDescription,
  errorMessage,
}) {
  if (isHomepage) return <div></div>;
  else {
    if (!errorMessage == "") {
      return <div>{errorMessage}</div>;
    } else {
      return (
        <div className="card-container">
          <img src={pokemonImg} />
          <div className="grid-container">
            <div>#{pokemonNumber}</div>
            <div>{pokemon}</div>
            <div>{pokemonType}</div>
            <div>{pokemonHeightM} m</div>
            <div>{pokemonWeightKG} kg</div>
            <div>{pokemonDescription}</div>
          </div>
        </div>
      );
    }
  }
}

export default PokemonCard;
