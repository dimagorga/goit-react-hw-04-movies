import { useState, useEffect } from "react";
import s from "./Cast.module.css";
import api from "../../API/TMDA";

export default function Cast({ id }) {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    if (id) {
      api.fetchCredits(id).then(({ data }) => {
        return data.cast.map((actor) => {
          const actorInfo = {
            name: actor.name,
            image: actor.profile_path,
            id: actor.id,
          };
          return setActors((prev) => {
            return [...prev, actorInfo];
          });
        });
      });
    }
  }, [id]);

  return (
    <div>
      <h3>Actors</h3>
      {actors.length > 0 ? (
        <ul className={s.list}>
          {actors.map((actor) => {
            return (
              <li key={actor.id} className={s.listItem}>
                {actor.image ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.image}`}
                    alt={actor.name}
                    className={s.img}
                  />
                ) : (
                  <img
                    src="https://st.depositphotos.com/1003711/1972/i/600/depositphotos_19720535-stock-photo-no-face-man.jpg"
                    alt="/"
                    width="150"
                  />
                )}
                <p>{actor.name}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No information</p>
      )}
    </div>
  );
}
