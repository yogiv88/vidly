import React, { useState } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MovieTable from "./moviesTable";
import { Movie, Genre } from "./../services/servicesInterface";
import { SortColumn } from './componentsInterface';

function Movies() {

  const [movies, setMovies] = useState<Array<Movie>>(getMovies());

  const genresList = [{name: "All Genres" }, ...getGenres()];
  const [genres] = useState<Array<Genre>>( genresList );
  const [selectedGenre, setSelectedGenre] = useState<Genre>(genresList[0]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(4);
  const [sortColumn, setSortColumn] = useState( { path: "title", order: "asc" } as SortColumn )

  function handleDelete(movie: Movie){
    const moviesFiltered = movies.filter((m: Movie) => movie._id !== m._id);
    setMovies(moviesFiltered);
  };
  function handleLike(movie: Movie){
    const moviesList = [...movies];
    const index = moviesList.indexOf(movie);
    moviesList[index] = { ...movie };
    moviesList[index].liked = !moviesList[index].liked;
    setMovies(moviesList);
  };
  function handlePageChange(page: number){
    setCurrentPage(page);
  };
  function handleGenreSelect(genre: Genre){
    setSelectedGenre(genre);
    setCurrentPage(1)
  };
  function handleSort(sortColumn: SortColumn){
    setSortColumn(sortColumn);
  };

  function getPagedData(){
    const filtered =
      selectedGenre && selectedGenre._id
        ? movies.filter((movie) => selectedGenre._id === movie.genre._id)
        : movies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const moviesPaginated = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: moviesPaginated };
  };

  if (movies.length === 0) {
    return <p>There are no movies in the database.</p>;
  }

  const { totalCount, data } = getPagedData();
  return (
    <div className="row">
      <div className="col-3">
        <ListGroup
          items={genres}
          selectedItem={selectedGenre}
          onItemSelect={handleGenreSelect}
          valueProperty='_id'
        />
      </div>
      <div className="col">
        <p>Showing {totalCount} movies from the database</p>
        <MovieTable
          movies={data}
          sortColumn={sortColumn}
          onLike={handleLike}
          onDelete={handleDelete}
          onSort={handleSort}
        />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          onPageChange={(page) => handlePageChange(page)}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}



export default Movies;
