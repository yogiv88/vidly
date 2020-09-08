import { Movie } from './../services/servicesInterface'

export interface SortColumn {
  path: string,
  order: 'asc'| 'desc'
}

export type MovieTableProps = {
  onLike: ( movie: Movie )=> void,
  onDelete: ( movie: Movie )=> void,
  onSort: (sortColumn: SortColumn) => void
  sortColumn: SortColumn,
  movies: Array<Movie>
}