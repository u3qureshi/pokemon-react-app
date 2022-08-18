import React, { useState, useEffect, useReducer } from "react";
import "./PokemonList.css";
import axios from "axios";

function PokemonList({ setIsHomepage, pokemonNames, isHomepage, setPokemon }) {
  function handleClick(e) {
    let pokemonName = e.target.textContent.toLowerCase();
    setPokemon(pokemonName);
    setIsHomepage(false);
  }
  function handleRandomClick() {
    let randomInt = getRandomInt(1, 700);
    setPokemon(randomInt);
    setIsHomepage(false);
  }
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // const [name, setName] = useState("");
  // const [pokemonImg, setPokemonImg] = useState("");
  // const [num, setNum] = useState("");

  // useEffect(() => {
  //   let cancel;
  //   axios
  //     .get(`https://pokeapi.co/api/v2/pokemon/${name}`, {
  //       cancelToken: new axios.CancelToken((c) => (cancel = c)),
  //     })
  //     .then((res) => {
  //       setPokemonImg(res.data.sprites.front_default);
  //       setNum(String(res.data.id).padStart(3, "0"));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //   return () => cancel();
  // }, [name]);

  //pokemon variable here is an array of pokemon names
  if (isHomepage) {
    return (
      <>
        <div className="tooltip">
          <img
            onClick={handleRandomClick}
            className="pokeball"
            src={require("./images/ball.png")}
          />
          <span class="tooltiptext">
            Random <span>PoKéMoN</span>
          </span>
        </div>

        <div className="pokemonNamesContainer">
          {pokemonNames.map((p) => (
            <div onClick={handleClick} className="pokemonNames">
              {p.name.toUpperCase()}
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return <div></div>;
  }
}

export default PokemonList;
