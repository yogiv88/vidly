import React from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Movie } from "../services/servicesInterface";
import { MovieTableProps } from "./componentsInterface";



function MovieTable(props:MovieTableProps) {
  const columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie: Movie) => (
        <Like onClick={() => props.onLike(movie)} liked={movie.liked} />
      ),
    },
    {
      key: "delete",
      content: (movie: Movie) => (
        <button
          onClick={() => props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
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
