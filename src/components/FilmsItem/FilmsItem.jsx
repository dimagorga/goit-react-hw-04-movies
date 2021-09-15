import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import s from "./FilmsItem.module.css";

export default function FilmsItem({ id, image, name }) {
  const location = useLocation();
  return (
    <li id={id} className={s.item}>
      <Link
        to={{
          pathname: `movie/${id}`,
          state: {
            from: location,
          },
        }}
      >
        {image && (
          <img
            className={s.image}
            src={`https://image.tmdb.org/t/p/w300/${image}`}
            alt={name}
          />
        )}
      </Link>
    </li>
  );
}
