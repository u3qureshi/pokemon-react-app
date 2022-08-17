import React from "react";
import "./PokedexHeader.css";

function PokedexHeader({ setIsHomepage, isHomepage, setCurrentPageUrl }) {
  function handleClick() {
    if (isHomepage) {
      setCurrentPageUrl("https://pokeapi.co/api/v2/pokemon");
    } else {
      setIsHomepage(true);
    }
  }
  return (
    <header>
      <div id="skew">
        <div className="text">
          <img src={require("./images/blue-circle.png")} />
          <span
            title="Double-click to return to the first page."
            onClick={handleClick}
            className="title"
          >
            PoKéDeX
          </span>
        </div>
      </div>
    </header>
  );
}

export default PokedexHeader;
