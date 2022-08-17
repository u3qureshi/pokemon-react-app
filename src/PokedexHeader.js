import React from "react";
import "./PokedexHeader.css";

function PokedexHeader({ setIsHomepage }) {
  function handleClick() {
    setIsHomepage(true);
  }
  return (
    <header>
      <div id="skew">
        <div className="text">
          <img src={require("./images/blue-circle.png")} />
          <span onClick={handleClick} className="title">
            PoKéDeX
          </span>
        </div>
      </div>
    </header>
  );
}

export default PokedexHeader;
