


export interface IMovie {
  _id: string,
  title: string,
  genre: IGenre,
  numberInStock: number,
  dailyRentalRate: number,
  publishDate?: string,
  liked?: boolean
}

export interface IGenre {
  _id?: string,
  name: string
}