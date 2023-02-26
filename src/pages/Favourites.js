import React from "react";
import { useState, useEffect } from "react";
import { Popup } from "../components/Popup";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);
  const [popupShown, setPopupShown] = useState(false);

  useEffect(() => {
    console.log(localStorage.getItem("favourites"));
    if (localStorage.getItem("favourites") !== null) {
      setFavourites(JSON.parse(localStorage.getItem("favourites")));
    }
  }, []);

  const deleteJoke = (id) => {
    const cleared = favourites.filter((joke) => joke.id !== id);
    setFavourites(cleared);
    setPopupShown(true);

    localStorage.setItem("favourites", JSON.stringify(cleared));
  };

  const deleteAllJokes = () => {
    localStorage.setItem("favourites", JSON.stringify([]));
    window.location.reload(false);
  };

  return (
    <div>
      {popupShown && <Popup message="Joke deleted." />}
      <table>
        <thead>
          <tr>
            <td>index</td>
            <td>joke</td>
            <td>
              <button onClick={deleteAllJokes}>DELETE ALL ŽOKES</button>
            </td>
          </tr>
        </thead>
        <tbody>
          {favourites.length >= 1
            ? favourites.map((joke, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{joke.value}</td>
                    <td>
                      <button onClick={() => deleteJoke(joke.id)}>
                        {" "}
                        Delete Joke{" "}
                      </button>
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Favourites;
