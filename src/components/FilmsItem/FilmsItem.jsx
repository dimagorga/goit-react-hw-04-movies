import { Link } from "react-router-dom";
import s from "./FilmsItem.module.css";
export default function FilmsItem({ id, image, name }) {
  return (
    <li id={id} className={s.item}>
      <Link to={`movie/${id}`}>
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
