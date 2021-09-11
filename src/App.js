import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation/Navigaton";
import HomeView from "./components/HomeView/HomeView";
import MoviesView from "./components/MoviesView/MoviesView";
function App() {
  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route exact path="/" component={HomeView} />
        <Route path="/movies" component={MoviesView} />
      </Switch>
    </div>
  );
}

export default App;
