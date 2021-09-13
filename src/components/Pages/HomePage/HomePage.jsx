import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useHistory, useLocation } from "react-router";
import s from "./HomePage.module.css";
import api from "../../../API/TMDA";
import FilmsItem from "../../FilmsItem/FilmsItem";
import FilmsList from "../../FilmsList/FilmsList";

export default function HomeView() {
  const [trendFilms, setTrendFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || page;

  useEffect(() => {
    history.push({ ...location, search: `page=${page}` });
    trendingFims(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  function trendingFims(page) {
    api.fetchTrending(page).then(({ data }) => {
      const pages = data.total_pages;
      setTotalPages(pages);
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

  const handlePageClick = (event) => {
    setTrendFilms([]);
    let selected = event.selected + 1;
    setPage(selected);
  };

  return (
    <div>
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
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={(event) => {
          handlePageClick(event);
        }}
        containerClassName={s.pagination}
        pageClassName={s.pageClassName}
        pageLinkClassName={s.pageLinkClassName}
        activeLinkClassName={s.activeLinkClassName}
        previousLinkClassName={s.previousLinkClassName}
        nextLinkClassName={s.nextLinkClassName}
      />
    </div>
  );
}
