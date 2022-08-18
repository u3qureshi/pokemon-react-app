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

  //set bgcolor dependent on the type
  function setColor(type) {
    let color = "";
    switch (type) {
      case "normal":
        color = "beige";
        break;
      case "fire":
        color = "orange";
        break;
      case "water":
        color = "mediumblue";
        break;
      case "grass":
        color = "forestgreen";
        break;
      case "electric":
        color = "gold";
        break;
      case "ice":
        color = "lightcyan";
        break;
      case "fighting":
        color = "darkred";
        break;
      case "poison":
        color = "rebeccapurple";
        break;
      case "ground":
        color = "saddlebrown";
        break;
      case "flying":
        color = "skyblue";
        break;
      case "psychic":
        color = "deeppink";
        break;
      case "bug":
        color = "darkseagreen";
        break;
      case "rock":
        color = "gray";
        break;
      case "ghost":
        color = "mediumpurple";
        break;
      case "dark":
        color = "black";
        break;
      case "dragon":
        color = "mediumslateblue";
        break;
      case "steel":
        color = "lightsteelblue";
        break;
      case "fairy":
        color = "pink";
        break;
    }
    return color;
  }

  if (isHomepage) return <div></div>;
  else {
    if (!errorMessage == "") {
      return <div className="error-div">{errorMessage}</div>;
    } else {
      return (
        <div className="card-container">
          <div className="grid-container">
            <div className="number">#{pokemonNumber}</div>

            <div className="type-container">
              {pokemonType.map((type) => (
                <div
                  style={{ backgroundColor: setColor(type.toLowerCase()) }}
                  key={type}
                  className="type"
                >
                  {type}
                </div>
              ))}
            </div>

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
