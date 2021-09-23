import { useParams, useRouteMatch } from "react-router";
import { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useHistory, useLocation } from "react-router";

import api from "../../API/TMDA";
import s from "./MovieDetailsPage.module.css";

const Cast = lazy(() => import("../../components/Cast/Cast.jsx"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews.jsx"));

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const [filmInfo, setFilmInfo] = useState({});
  const history = useHistory();
  const location = useLocation();

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

  const goBack = () => {
    history.push(location?.state?.from ?? "/");
  };

  console.log();

  if (filmInfo) {
    return (
      <div>
        <button type="button" onClick={goBack}>
          Go back
        </button>
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
            <Link
              to={{
                pathname: `${url}/cast`,
                state: {
                  from: location?.state?.from ?? "/",
                },
              }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: `${url}/reviews`,
                state: {
                  from: location?.state?.from ?? "/",
                },
              }}
            >
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Route path={`${path}/cast/`}>
            <Cast id={movieId} />
          </Route>
          <Route path={`${path}/reviews`}>
            <Reviews id={movieId} />
          </Route>
        </Suspense>
      </div>
    );
  }
}
