import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigaton";
import HomeView from "./components/Pages/HomeView/HomeView";
import MoviesView from "./components/Pages/MoviesView/MoviesView";
import FilmInfo from "./components/Pages/FilmInfo/FilmInfo";

function App() {
  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/movies" component={MoviesView} />
        <Route path="/movie/:movieId" component={FilmInfo} />
      </Switch>
    </div>
  );
}

export default App;
