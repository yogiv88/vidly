import React from "react";
import { useParams } from 'react-router-dom';
import { getMovie } from "../services/fakeMovieService";
import { IMovie } from "../services/servicesInterface";
import { IMovieParams } from "./componentsInterface";



function Movie() {
  const { movieId } = useParams<IMovieParams>();
  const movie = getMovie(movieId) as IMovie
  return (
    <div className="row">
      <div className="jumbotron col-md-12">
        <h1 className="display-4">{movie.title}</h1>
        <p className="lead">{movie.genre.name}</p>
        <hr className="my-4" />
        <p>In Stock: {movie.numberInStock}</p>
        <p>Cost: ${movie.dailyRentalRate}</p>
      </div>
    </div>
  );

}

export default Movie;
