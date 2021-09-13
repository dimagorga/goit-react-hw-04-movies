import axios from "axios";
const API_KEY = "a1b601c1904a22fbe84bd626ba96fafa";
const BASE_URL = "https://api.themoviedb.org/3/";

function fetchTrending(page = 1) {
  return axios.get(
    `${BASE_URL}trending/all/day?api_key=${API_KEY}&page=${page}`
  );
}

function fetchSearchMovies(searchQuery, page = 1) {
  return axios.get(
    `${BASE_URL}search/movie?query=${searchQuery}&api_key=${API_KEY}&language=en-US&page=${page}&include_adult=false`
  );
}

function fetchMovie(id) {
  return axios.get(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`);
}

function fetchCredits(id) {
  return axios.get(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
}
function fetchReviews(id) {
  return axios.get(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
}

const api = {
  fetchTrending,
  fetchSearchMovies,
  fetchMovie,
  fetchCredits,
  fetchReviews,
};
export default api;
