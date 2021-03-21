export type MultiSearchCommonProperties = {
  id?: number;
  media_type: string;
  name?: string;
  popularity?: number;
  adult?: boolean;
};

export type SearchMovie = MultiSearchCommonProperties & {
  media_type: 'movie';
  poster_path?: string | null;
  overview?: string;
};

export type SearchTV = MultiSearchCommonProperties & {
  media_type: 'tv';
  poster_path?: string | null;
  overview?: string;
};

export type SearchPerson = MultiSearchCommonProperties & {
  media_type: 'person';
  profile_path?: string | null;
};

type CreditMember = {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
};

// TV Shows don't have cast_id
type CastMovieTV = CreditMember & {
  cast_id?: number;
  character?: string;
  order?: number;
};

type CrewMovieTV = CreditMember & {
  department?: string;
  job?: string;
};

type CreditPerson = {
  id: number;
  original_language: string;
  episode_count: number;
  overview: string;
  origin_country: string[];
  original_name: string;
  vote_count: number;
  name: string;
  media_type: string;
  popularity: number;
  credit_id: string;
  backdrop_path: string | null;
  first_air_date: string;
  vote_average: number;
  genre_ids: number[];
  poster_path: string | null;
  original_title: string;
  video: boolean;
  title: string;
  adult: boolean;
  release_date: string;
};

type CastPerson = CreditPerson & {
  character?: string;
};

type CrewPerson = CreditPerson & {
  department: string;
  job: string;
};

type Credits<Cast, Crew> = {
  id?: number;
  cast?: Cast[];
  crew?: Crew[];
};

export type MovieCredits = Credits<CastMovieTV, CrewMovieTV>;
export type TVCredits = Credits<CastMovieTV, CrewMovieTV>;
export type PersonCredits = Credits<CastPerson, CrewPerson>;

export type Detailed = {};

// ToDo: add missing properties (resource details) to Movie and TV
export type Movie = Detailed & SearchMovie;
export type TV = Detailed & SearchTV;

export type Person = Detailed & {
  birthday?: string | null;
  known_for_department?: string;
  deathday?: string | null;
  id?: number;
  name?: string;
  also_known_as?: string[];
  gender?: number;
  biography?: string;
  popularity?: number;
  place_of_birth?: string | null;
  profile_path?: string | null;
  adult?: boolean;
  imdb_id?: string;
  homepage?: string | null;
};
