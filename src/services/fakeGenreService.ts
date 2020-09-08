import { Genre } from './servicesInterface';

export const genres: Array<Genre> = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Action" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Comedy" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Thriller" }
];

export function getGenres(): Array<Genre> {
  return genres.filter(g => g);
}
