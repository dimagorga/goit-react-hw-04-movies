import s from "./FilmList.module.css";
export default function FilmsList({ children }) {
  return <ul className={s.list}>{children}</ul>;
}
