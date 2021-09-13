import { useParams, useRouteMatch } from "react-router";
import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import api from "../../../API/TMDA";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../Cast/Cast.jsx"));
const Reviews = lazy(() => import("../Reviews/Reviews.jsx"));

export default function MovieDetailsPage() {
  const { url } = useRouteMatch();

  const { movieId } = useParams();
  const [filmInfo, setFilmInfo] = useState({});
  useEffect(() => {
    return api.fetchMovie(movieId).then(({ data }) => {
      const movieGenres = data.genres.map((genre) => {
        return genre.name;
      });
      const info = {
        key: data.id,
        img: data.poster_path,
        filmName: data.title,
        rating: data.vote_average,
        tag: data.tagline,
        date: data.release_date.substr(0, 4),
        genres: movieGenres,
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
            <h3>Overview:</h3>
            <p>{filmInfo.descr}</p>
            <h3>Genres</h3>
            <p>
              {filmInfo.genres &&
                filmInfo.genres.map((genre) => {
                  return `${genre} `;
                })}
            </p>
          </div>
        </div>
        <hr />
        <ul className={s.list}>
          <li className={s.link}>
            <Link to={`${url}/cast`}>Cast</Link>
          </li>
          <li>
            <Link to={`${url}/reviews`}>Reviews</Link>
          </li>
        </ul>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Route path={`${url}/cast/`}>
            <Cast id={filmInfo.key} />
          </Route>
          <Route path={`${url}/reviews`}>
            <Reviews id={filmInfo.key} />
          </Route>
        </Suspense>
      </div>
    );
  }
}