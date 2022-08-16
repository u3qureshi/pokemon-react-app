import React, { useState, useEffect } from "react";
import PokemonList from "./PokemonList";
import PaginationFooter from "./PaginationFooter";
import axios from "axios";
import "./App.css";
import PokedexHeader from "./PokedexHeader";

function App() {
  // useState returns two variables in the form of an array which can be destructured
  const [pokemonNames, setPokemonNames] = useState([]);
  // currentPageUrl to track the page we are currently on
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [previousIsNull, setPreviousIsNull] = useState(false);
  const [nextIsNull, setNextIsNull] = useState(false);

  //useEffect is a MUST for API calls.
  // This useEffect hook must re-fetch and re-render the page every time the currentPageUrl changes
  useEffect(() => {
    setLoading(true); //set loading variable to true when API request begins to load
    let cancel;
    // Getting something from the pokeAPI
    axios
      .get(currentPageUrl, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((response) => {
        setLoading(false); // set loading to false when request has successfully been fetched.
        setPokemonNames(response.data.results.map((pokemon) => pokemon));
        setNextPageUrl(response.data.next);
        setPreviousPageUrl(response.data.previous);
        console.log(response.data.previous);
        // set previousIsNull to true if the previousPageUrl is null
        if (response.data.previous == null) setPreviousIsNull(true);
        else setPreviousIsNull(false);

        // set nextIsNull to true if the nextPageUrl is null
        if (response.data.next == null) setNextIsNull(true);
        else setNextIsNull(false);
      });

    // useEffect allows you to return a function which gets called every single time useEffect gets called again
    // this allows to clean up after the last call
    // It will allow us to cancel a previous fetch request everytime we make a new request
    return () => cancel();
  }, [currentPageUrl]); // --> This useEffect hook must re-fetch every time the currentPageUrl changes

  // Two functions for pagination. One for the next page and one for the previous page.
  // All we need to do is use "setCurrentPageUrl" because whenever the currentPageUrl variable
  // is changed, then the useEffect function will run and the page will be re-rendered.
  function nextPageClicked() {
    setCurrentPageUrl(nextPageUrl);
  }
  function previousPageClicked() {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <div className="main-container">
      <form id="form" role="search">
        <button>🔎</button>

        <input
          type="search"
          id="query"
          name="q"
          placeholder="Search..."
          aria-label="Search through site content"
        />
      </form>
      <PokedexHeader />
      <PokemonList pokemonNames={pokemonNames} />
      <PaginationFooter
        // FUNCTIONS BEING PASSED AS PROPS
        nextPageClicked={nextPageClicked}
        previousPageClicked={previousPageClicked}
        previousIsNull={previousIsNull}
        nextIsNull={nextIsNull}
      />
    </div>
  );
}

export default App;

// We are using a library called Axios which allows us to fetch from APIs easier than the
// default fetch method from the browser.
