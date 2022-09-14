import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  filterFilmsByDirector,
  getListOf,
} from "../component/helpers/film.helpers";

export default function FilmsPage() {
  const [list, setList] = useState([]);
  let [searchDirector, setSearchDirector] = useState("");

  function getFilms() {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((res) => res.json())
      .then((films) => {
        setList(films);
      });
    console.log(films).catch((err) => console.error(err));
  }

  useEffect(() => {
    getFilms();
  }, []);
  let filteredFilms = filterFilmsByDirector(list, searchDirector);
  let directors = getListOf(list, "director");
  return (
    <div>
      <form>
        <div className="form-group">
          <h1>Studio Ghibli Films</h1>
          <select
            name="searchDirector"
            id="searchDirector"
            value={searchDirector}
            onChange={(e) => searchDirector(e.target.value)}
          >
            <option value=" ">All</option>
            {directors.map((director) => (
              <option key={director} value={director}>
                {director}
              </option>
            ))}
          </select>
        </div>
      </form>
      <ul>
        {filteredFilms.map((film) => {
          <li key={film.id}><Link to={`films/${film.id}`}></Link>{film.title}</li>;
        })}
      </ul>
    </div>
  );
}
