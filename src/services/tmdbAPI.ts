import axios from 'axios';
import {
  Detailed,
  Movie,
  MovieCredits,
  MultiSearchCommonProperties,
  Person,
  PersonParticipations,
  SearchMovie,
  SearchPerson,
  SearchTV,
  TV,
  TVCredits,
} from '../types/tmdbAPI';

const token = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const tmdbAPI = axios.create({
  baseURL: process.env.REACT_APP_TMDB_API,
});

tmdbAPI.defaults.headers.common = {
  Authorization: token ? `Bearer ${token}` : '',
};

export type TMDBResponse<T extends MultiSearchCommonProperties> = {
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

export const getResource = <T, P>(
  resource: string,
  id?: number | string,
  extraPath?: string
) => async (params?: P): Promise<T> => {
  try {
    const _idPath = id ? `/${id}` : '';
    const _extraPath = extraPath ? `/${extraPath}` : '';
    const { data } = await tmdbAPI.get(`${resource}${_idPath}${_extraPath}`, {
      params,
    });
    return data;
  } catch (error) {
    // ToDo: generate a pretty error to throw to the component
    throw error;
  }
};

const search = <T extends MultiSearchCommonProperties>(resource: string) =>
  getResource<TMDBResponse<T>, MultiSearch>('search', undefined, resource);

export const multiSearch = search<SearchMovie | SearchTV | SearchPerson>(
  'multi'
);
export const movieSearch = search<SearchMovie>('movie');
export const tvSearch = search<SearchTV>('tv');
export const personSearch = search<SearchPerson>('person');

const getResourceExtra = <T>(resource: string, extra?: string) => (
  id: number | string
) => getResource<T, null>(resource, id, extra)();

const getResourceById = <T extends Detailed>(resource: string) => (
  id: number | string
) => getResourceExtra<T>(resource)(id);

export const getMovieById = getResourceById<Movie>('movie');
export const getTVById = getResourceById<TV>('tv');
export const getPersonById = getResourceById<Person>('person');

export const getMovieCredits = getResourceExtra<MovieCredits>(
  'movie',
  'credits'
);
export const getTVCredits = getResourceExtra<TVCredits>('tv', 'credits');
export const getPersonCombinedCredits = getResourceExtra<PersonParticipations>(
  'person',
  'combined_credits'
);

export const getImageSourceURL = (path: string, size: 'original' | 'w200' | 'w300' | 'w400' | 'w500' = 'w200') =>
  `${process.env.REACT_APP_TMDB_IMAGE_API}${size}/${path}`
