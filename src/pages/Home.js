import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
  const API_URL = "https://api.chucknorris.io/jokes/random";
  const [joke, setJoke] = useState([]);

  useEffect(() => {
    generateJoke();
  }, []);

  const generateJoke = () => {
    axios
      .get(API_URL)
      .then((response) => {
        setJoke(response.data);
      })
      .catch((err) => console.log(err));
  };

  const saveJoke = () => {
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    if (!favourites) {
      favourites = [];
    }
    if (joke && !checkDuplicates(favourites, joke.id)) {
      favourites.push(joke);
    }
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  const checkDuplicates = (favourites, id) => {
    const isDuplicate = favourites.filter((joke) => joke.id === id);
    if (!isDuplicate.length) {
      return false;
    }
    return true;
  };

  return (
    <div className="App">
      <div className="Box">
        <h1> Chuck Norris Joke Generator! </h1>
        <p key={joke.id}> {joke?.value} </p>
        <button onClick={() => generateJoke}> GET NEW JOKE </button>
        <button onClick={() => saveJoke}> SAVE JOKE</button>
      </div>
    </div>
  );
};

export default HomePage;
