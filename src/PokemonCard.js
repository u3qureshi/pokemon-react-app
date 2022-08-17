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
  //metric conversions
  let pokemonHeightFT = Math.round(pokemonHeightM * 3.281 * 10) / 10;
  let pokemonWeightLBS = Math.round(pokemonWeightKG * 2.205 * 10) / 10;

  if (isHomepage) return <div></div>;
  else {
    if (!errorMessage == "") {
      return <div className="error-div">{errorMessage}</div>;
    } else {
      return (
        <div className="card-container">
          <div className="grid-container">
            <div className="number">#{pokemonNumber}</div>
            <div className="type">{pokemonType}</div>
            <div className="height">
              HEIGHT: {pokemonHeightM} m {"("}
              {pokemonHeightFT}
              {" ft)"}
            </div>
            <div className="weight">
              WEIGHT: {pokemonWeightKG} kg {"("}
              {pokemonWeightLBS}
              {" lbs)"}
            </div>
            <div className="description">{pokemonDescription}</div>
          </div>
          <div className="right-div">
            <img src={pokemonImg} />
            <div className="name">{pokemon}</div>
          </div>
        </div>
      );
    }
  }
}

export default PokemonCard;
