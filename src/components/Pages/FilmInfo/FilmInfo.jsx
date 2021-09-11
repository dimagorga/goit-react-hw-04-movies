import { useParams } from "react-router";
import { useEffect } from "react";
import api from "../../../API/TMDA";
import s from "./FilmInfo.module.css";
import { useState } from "react/cjs/react.development";

export default function FilmInfo() {
  const { movieId } = useParams();
  const [filmInfo, setFilmInfo] = useState({});
  //   console.log(params);
  useEffect(() => {
    return api.fetchMovie(movieId).then(({ data }) => {
      const info = {
        key: data.id,
        img: data.poster_path,
        filmName: data.title,
        rating: data.vote_average,
        tag: data.tagline,
        date: data.release_date.substr(0, 4),
        genres: data.genres,
        descr: data.overview,
      };
      return setFilmInfo(info);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (filmInfo) {
    return (
      <div>
        <div className={s.film}>
          {filmInfo.img ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${filmInfo.img}`}
              alt={filmInfo.filmName}
            />
          ) : (
            <img
              src="https://img1.goodfon.ru/wallpaper/nbig/4/3f/kino-kamera-film-shtativ.jpg"
              alt="/"
              width="400"
            />
          )}
          <div className={s.descr}>
            {filmInfo.filmName && (
              <h2>
                {filmInfo.filmName} {filmInfo.date}
              </h2>
            )}
            {filmInfo.tag && <p>"{filmInfo.tag}"</p>}
            <p> Rating: {filmInfo.rating}/10</p>
            <p>Overview: {filmInfo.descr}</p>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
