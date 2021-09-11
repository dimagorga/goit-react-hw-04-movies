import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./MoviesView.module.css";
import api from "../../../API/TMDA";
import FilmsItem from "../../FilmsItem/FilmsItem";
import FilmsList from "../../FilmsList/FilmsList";

function MoviesView() {
  const [input, setInput] = useState("");
  const [films, setFilms] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.info("Write something to find!", {
        theme: "dark",
      });
    }
    formSubmit(input);
    setInput("");
  };

  function formSubmit(searchInput) {
    if (searchInput.trim === "") {
      setFilms([]);
    } else {
      api.fetchSearchMovies(searchInput).then(({ data }) => {
        return data.results.map((result) => {
          const info = [
            {
              key: result.id,
              img: result.poster_path,
              filmName: result.name,
              rating: result.vote_average,
            },
          ];
          return setFilms((prevState) => {
            return [...prevState, ...info];
          });
        });
      });
    }
  }

  return (
    <div>
      <div className={s.MoviesView}>
        <form className={s.MoviesViewForm} onSubmit={handleSubmit}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={s.MoviesViewFormButton}
          />
          <input
            onChange={handleChange}
            className={s.MoviesViewFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies or serials"
          />
        </form>
        <ToastContainer />
      </div>
      <FilmsList>
        {films.map((film) => {
          return (
            <FilmsItem
              key={film.key}
              id={film.key}
              image={film.img}
              name={film.filmName}
            />
          );
        })}
      </FilmsList>
    </div>
  );
}

export default MoviesView;
