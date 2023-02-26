import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../const";
import "../css/Home.css";
import { Popup } from "../components/Popup";

const HomePage = () => {
  const [joke, setJoke] = useState([]);
  const [popupShown, setPopupShown] = useState(false);

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
    setPopupShown(false);
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
    setPopupShown(true);
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
        <div className="ButtonLayout">
          <button onClick={generateJoke}> GET NEW JOKE </button>
          <button onClick={saveJoke}> SAVE JOKE</button>
        </div>
        {popupShown && <Popup message="Joke saved" />}
      </div>
    </div>
  );
};

export default HomePage;
