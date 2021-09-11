import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
export default function Navigation() {
  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        <li className={s.listItem}>
          <NavLink to="/" className="link" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li className={s.listItem}>
          <NavLink to="/movies" className="link" activeClassName="active-link">
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
