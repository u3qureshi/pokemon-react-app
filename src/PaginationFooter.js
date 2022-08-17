import React from "react";
import "./PaginationFooter.css";

function PaginationFooter({
  nextPageClicked,
  previousPageClicked,
  previousIsNull,
  nextIsNull,
  isHomepage,
}) {
  if (isHomepage) {
    return (
      <div className="footer-container">
        <div className="button-container">
          <button
            className="previous-button"
            disabled={previousIsNull && true}
            onClick={previousPageClicked}
          >
            <span>PREVIOUS</span>
          </button>
          <button disabled={nextIsNull && true} onClick={nextPageClicked}>
            <span>NEXT</span>
          </button>
        </div>
        <div className="copyright">
          Copyright © 2022 Usman Qureshi
          <a
            href="https://github.com/u3qureshi/pokemon-react-app"
            target="_blank"
            className="fa fa-github"
          ></a>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default PaginationFooter;
