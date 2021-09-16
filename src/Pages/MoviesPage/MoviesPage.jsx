import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory, useLocation } from "react-router";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.css";
import s from "./MoviesPage.module.css";
import api from "../../API/TMDA";
import FilmsItem from "../../components/FilmsItem/FilmsItem";
import FilmsList from "../../components/FilmsList/FilmsList";

function MoviesView() {
  const [input, setInput] = useState("");
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") || "";
  const perPage = new URLSearchParams(location.search).get("page") || 1;

  useEffect(() => {
    if (input !== "") {
      setInput(searchQuery);
    }
    if (page !== 1) {
      setPage(perPage);
    }
  }, []);

  useEffect(() => {
    if (input !== "" || page !== perPage) {
      setInput(searchQuery);
      formSubmit(searchQuery, perPage);
    }
  }, [page]);

  const handleChange = (e) => {
    setInput(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.info("Write something to find!", {
        theme: "dark",
      });
    }
    setFilms([]);
    history.push({ ...location, search: `query=${input}` });

    formSubmit(input);
  };

  function formSubmit(searchInput, page) {
    if (searchInput.trim === "") {
      setFilms([]);
    } else {
      api
        .fetchSearchMovies(searchInput, page)
        .then(({ data }) => {
          const pages = data.total_pages;
          setTotalPages(pages);
          if (data.results.length === 0) {
            toast.error(`"${searchInput}" is not found`, {
              theme: "dark",
            });
          }
          return data.results.map((result) => {
            const info = [
              {
                key: result.id,
                img: result.poster_path,
                filmName: result.name,
                rating: result.vote_average,
              },
            ];
            return setFilms((prevState) => {
              return [...prevState, ...info];
            });
          });
        })
        .catch((error) => error);
    }
  }
  const handlePageClick = (event) => {
    setFilms([]);
    let selected = event.selected + 1;
    setPage(selected);
    history.push({ ...location, search: `query=${input}&page=${selected}` });
  };

  return (
    <div>
      <div className={s.MoviesView}>
        <form className={s.MoviesViewForm} onSubmit={handleSubmit}>
          <button
            type="submit"
            onClick={handleSubmit}
            className={s.MoviesViewFormButton}
          />
          <input
            onChange={handleChange}
            className={s.MoviesViewFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies or serials"
          />
        </form>
        <ToastContainer />
      </div>
      <FilmsList>
        {films.map((film) => {
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
      {films.length > 0 && (
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
      )}
    </div>
  );
}

export default MoviesView;
