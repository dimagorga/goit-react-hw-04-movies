import { useEffect, useState } from "react";
// import s from "./HomeView.module.css";
import api from "../../../API/TMDA";
import FilmsItem from "../../FilmsItem/FilmsItem";
import FilmsList from "../../FilmsList/FilmsList";

export default function HomeView() {
  const [trendFilms, setTrendFilms] = useState([]);

  useEffect(() => {
    trendingFims();
  }, []);

  function trendingFims() {
    api.fetchTrending().then(({ data }) => {
      return data.results.map((result) => {
        const info = [
          {
            key: result.id,
            img: result.poster_path,
            filmName: result.name,
            rating: result.vote_average,
          },
        ];
        return setTrendFilms((prevState) => {
          return [...prevState, ...info];
        });
      });
    });
  }
  return (
    <FilmsList>
      {trendFilms.map((film) => {
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
  );
}
