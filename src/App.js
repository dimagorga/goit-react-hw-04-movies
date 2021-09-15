import { Switch, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import "./App.css";
import Navigation from "./components/Navigation/Navigaton";

const HomePage = lazy(() => import("./Pages/HomePage/HomePage.jsx"));
const MoviesPage = lazy(() => import("./Pages/MoviesPage/MoviesPage.jsx"));
const MovieDetailsPage = lazy(() =>
  import("./Pages/MovieDetailsPage/MovieDetailsPage.jsx")
);
function App() {
  return (
    <div className="container">
      <Navigation />
      <Suspense fallback={<h1>Loading</h1>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movie/:movieId">
            <MovieDetailsPage />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
