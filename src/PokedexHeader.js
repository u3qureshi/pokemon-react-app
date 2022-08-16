import React from "react";
import "./PokedexHeader.css";

function PokedexHeader() {
  return (
    <header>
      <div id="skew">
        <div className="text">
          <img src={require("./images/blue-circle.png")} />
          <span>PoKéDeX</span>
        </div>
      </div>
    </header>
  );
}

export default PokedexHeader;
