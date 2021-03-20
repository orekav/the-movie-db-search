export type CommonProperties = {
  id?: number;
  media_type: string;
  name?: string;
  popularity?: number;
  adult?: boolean;
};

export type Movie = CommonProperties & {
  media_type: 'movie';
  poster_path?: string | null;
  overview?: string;
};

export type TV = CommonProperties & {
  media_type: 'tv';
  poster_path?: string | null;
  overview?: string;
};

export type Person = CommonProperties & {
  media_type: 'person';
  profile_path?: string | null;
};
