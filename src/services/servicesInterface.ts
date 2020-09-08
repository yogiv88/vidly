


export interface Movie {
  _id: string,
  title: string,
  genre: Genre,
  numberInStock: number,
  dailyRentalRate: number,
  publishDate?: string,
  liked?: boolean
}

export interface Genre {
  _id: string,
  name: string
}