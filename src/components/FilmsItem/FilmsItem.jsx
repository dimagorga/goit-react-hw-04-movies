import s from "./FilmsItem.module.css";
export default function FilmsItem({ id, image, name }) {
  return (
    <li id={id} className={s.item}>
      <img
        className={s.image}
        src={`https://image.tmdb.org/t/p/w300/${image}`}
        alt={name}
      />
    </li>
  );
}
