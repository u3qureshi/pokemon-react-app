import React, { useState, useEffect, useReducer } from "react";
import PokemonList from "./PokemonList";
import PaginationFooter from "./PaginationFooter";
import axios from "axios";
import "./App.css";
import PokedexHeader from "./PokedexHeader";
import PokemonCard from "./PokemonCard";
import PokemonCardFooter from "./PokemonCardFooter";

function App() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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
  const [isHomepage, setIsHomepage] = useState(true);

  // These 3 state variables are for the second API call for a specific pokemon
  const [pokemon, setPokemon] = useState("");
  const [pokemonHeightM, setPokemonHeightM] = useState("");
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonWeightKG, setPokemonWeightKG] = useState("");
  const [pokemonImg, setPokemonImg] = useState("");
  const [pokemonNumber, setPokemonNumber] = useState("");
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tempName, setTempName] = useState("");
  const [finalName, setFinalName] = useState("");

  // Variables for the next and previous pokemon in the list
  const [nextPokemonNumber, setNextPokemonNumber] = useState();
  const [previousPokemonNumber, setPreviousPokemonNumber] = useState();

  /** SECTION FOR THE SECOND API CALL FOR A SPECIFIC POKEMON */
  useEffect(() => {
    let cancel;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        setPokemonType(res.data.types[0].type.name);
        setPokemonHeightM(res.data.height / 10);
        setPokemonWeightKG(res.data.weight / 10);
        setPokemonType(getTypes(res.data.types));
        setPokemonImg(res.data.sprites.other.dream_world.front_default);
        setPokemonNumber(String(res.data.id).padStart(3, "0"));
        setNextPokemonNumber(res.data.id + 1);
        setPreviousPokemonNumber(res.data.id - 1);
        setErrorMessage("");
        setFinalName(pokemon);
        // change border color after successful query
        document.querySelector("#query").style.border =
          "1.5px solid lightgreen";
        setTimeout(() => {
          document.querySelector("#query").style.border = "1.5px solid yellow";
        }, 1700);

        // Check if the pokemons finalName is a number
        if (!isNaN(pokemon)) {
          setFinalName(res.data.name);
        }
      })
      .catch((error) => {
        setErrorMessage("Please enter a correct Pokémon name.");
        document.querySelector("#query").style.border = "1.5px solid red";
        setTimeout(() => {
          document.querySelector("#query").style.border = "1.5px solid yellow";
        }, 1700);
      });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`, {
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        let description = res.data.flavor_text_entries[1].flavor_text;
        setPokemonDescription(description);
      });
    return () => cancel();
  }, [pokemon]);

  function getTypes(typesArray) {
    let newTypesArray = [];
    typesArray.forEach((element) => {
      newTypesArray.push(element.type.name);
    });

    return newTypesArray.join(", ").toUpperCase();
  }

  const handleChange = (e) => {
    setTempName(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsHomepage(false);
    setPokemon(tempName);
    document.querySelector("#query").value = "";
  };

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

  if (loading) return <div className="load-sign">Loading...</div>;

  // // Function to delay code momentarily
  // function sleep(ms) {
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // } //use await sleep(ms);

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit} id="form" role="search">
        <button>🔎</button>
        <label>
          <input
            type="text"
            onChange={handleChange}
            id="query"
            placeholder="Enter Pokemon Name..."
            aria-label="Search through site content"
          />
        </label>
      </form>
      <PokedexHeader
        setCurrentPageUrl={setCurrentPageUrl}
        setIsHomepage={setIsHomepage}
        isHomepage={isHomepage}
      />
      <div className="subtext">
        There are 905 <span>PoKéMoN</span>™. Search for one by name or using its
        National Pokédex number!
      </div>
      <PokemonList
        setPokemon={setPokemon}
        pokemonNames={pokemonNames}
        isHomepage={isHomepage}
        setIsHomepage={setIsHomepage}
      />
      <PaginationFooter
        // FUNCTIONS BEING PASSED AS PROPS
        nextPageClicked={nextPageClicked}
        previousPageClicked={previousPageClicked}
        previousIsNull={previousIsNull}
        nextIsNull={nextIsNull}
        isHomepage={isHomepage}
      />
      <PokemonCard
        isHomepage={isHomepage}
        pokemonDescription={pokemonDescription.replace("", " ")}
        pokemonHeightM={pokemonHeightM}
        pokemonImg={pokemonImg}
        pokemonNumber={pokemonNumber}
        pokemonType={pokemonType}
        pokemonWeightKG={pokemonWeightKG}
        errorMessage={errorMessage}
        pokemon={finalName.toUpperCase()}
      />
      <PokemonCardFooter
        isHomepage={isHomepage}
        nextPokemonNumber={nextPokemonNumber}
        previousPokemonNumber={previousPokemonNumber}
        setPokemon={setPokemon}
      />
    </div>
  );
}

export default App;

// We are using a library called Axios which allows us to fetch from APIs easier than the
// default fetch method from the browser.
