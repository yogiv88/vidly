import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MovieTable from "./moviesTable";
import { Movie, Genre } from "./../services/servicesInterface";
import { SortColumn } from './componentsInterface';

class Movies extends Component {
  state = {
    movies: [] as Array<Movie>,
    pageSize: 4,
    currentPage: 1,
    genres: [] as Array<Genre>,
    selectedGenre: undefined as Genre | undefined,
    sortColumn: { path: "title", order: "asc" } as SortColumn,
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres: genres,
      selectedGenre: genres[0],
    });
  }

  handleDelete = (movie: Movie) => {
    const movies = this.state.movies.filter((m) => movie._id !== m._id);
    this.setState({ movies });
  };
  handleLike = (movie: Movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre: Genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };
  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((movie) => selectedGenre._id === movie.genre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      genres,
    } = this.state;
    const { length: count } = this.state.movies;

    const { totalCount, data: movies } = this.getPagedData();

    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies from the database</p>
          <MovieTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={(page) => this.handlePageChange(page)}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}



export default Movies;
