import axios from 'axios';
import { CommonProperties, Movie, Person, TV } from '../models/tmdbAPI';

const token = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const tmdbAPI = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API,
});

tmdbAPI.defaults.headers.common = {
  Authorization: token ? `Bearer ${token}` : '',
};

type TMDBResponse<T extends CommonProperties> = {
  page?: number;
  total_results?: number;
  total_pages?: number;
  results: T[];
};

type MultiSearch = {
  query: string;
  page?: number;
  include_adult?: boolean;
};

export const search = <T extends CommonProperties>(searchType: string) => ({
  query,
  page,
  include_adult,
}: MultiSearch): Promise<TMDBResponse<T>> =>
  tmdbAPI.get(`search/${searchType}`, {
    params: {
      query,
      page,
      include_adult,
    },
  });

export const multiSearch = search<Movie | TV | Person>('multi');
export const movieSearch = search<Movie>('movie');
export const tvSearch = search<TV>('tv');
export const personSearch = search<Person>('person');
