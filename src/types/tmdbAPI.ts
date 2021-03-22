export type MediaType = 'multi' | 'movie' | 'tv' | 'person';

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
  title?: string;
  original_title?: string;
};

export type SearchTV = MultiSearchCommonProperties & {
  media_type: 'tv';
  poster_path?: string | null;
  overview?: string;
  original_name?: string;
};

export type SearchPerson = MultiSearchCommonProperties & {
  media_type: 'person';
  profile_path?: string | null;
};

export type CreditMember = {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
  media_type: 'person';
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

export type PersonCredits = {
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

type CastPerson = PersonCredits & {
  character?: string;
};

type CrewPerson = PersonCredits & {
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
export type PersonParticipations = Credits<CastPerson, CrewPerson>;

export type Detailed = {
  id?: number
  popularity?: number;
};

// ToDo: add missing properties (resource details) to Movie and TV
export type Movie = Detailed & {
  release_date?: string;
  original_title?: string;
  status?: string;
  title?: string;
  overview?: string;
};
export type TV = Detailed & {
  name?: string;
  original_name?: string;
  status?: string;
  first_air_date?: string;
  last_air_date?: string;
  overview?: string;
};

export type Person = Detailed & {
  birthday?: string | null;
  known_for_department?: string;
  deathday?: string | null;
  name?: string;
  also_known_as?: string[];
  gender?: number;
  biography?: string;
  place_of_birth?: string | null;
  profile_path?: string | null;
  adult?: boolean;
  imdb_id?: string;
  homepage?: string | null;
};
