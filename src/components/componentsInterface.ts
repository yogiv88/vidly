import { IMovie } from './../services/servicesInterface'

export interface ISortColumn {
  path: string,
  order: 'asc'| 'desc'
}

export type IMovieTableProps = {
  onLike: ( movie: IMovie )=> void,
  onDelete: ( movie: IMovie )=> void,
  onSort: (sortColumn: ISortColumn) => void
  sortColumn: ISortColumn,
  movies: Array<IMovie>
}

export type IMovieParams = {
  movieId: string
}