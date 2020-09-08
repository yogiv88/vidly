import React from "react";
import "./App.css";
import Movies from "./components/movies";
import Movie from "./components/movie";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <main className="container">
      <Router>
        <div>
          <Switch>
            <Route path="/movie/:movieId">
              <Movie />
            </Route>
            <Route path="/">
              <Movies />
            </Route>
          </Switch>
        </div>
      </Router>
    </main>
  );
}

export default App;
