import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import { IMovie } from "../services/servicesInterface";
import { IMovieTableProps } from "./componentsInterface";



function MovieTable(props:IMovieTableProps) {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie: IMovie) => (
        <Like onClick={() => props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie: IMovie) => (
        <button
          onClick={() => props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
    {
      key: "view",
      content: (movie: IMovie) => (
        <a
          href={`/movie/${movie._id}`}
          className="btn btn-success btn-sm"
        >
          View
        </a>
      ),
    },
  ];

  const { movies, onSort, sortColumn } = props;
  return (
    <Table
      data={movies}
      columns={columns}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );

}

export default MovieTable;
