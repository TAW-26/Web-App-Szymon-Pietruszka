
export interface ShortReviewResponse {
  text: string;
  created_at: string;
  nickname: string;
}

export interface MovieResponse {
  id_movie: number;
  title: string;
  description: string;
  director: string;
  composer: string;
  poster: string | null;
  production: string;
  year: number;
  rating: number;
  genres: string[];
  actors: string[];
  reviews: ShortReviewResponse[];
}

export interface UserDataResponse {
  nickname: string;
  name: string | null;
  email: string;
  birthdate: Date | null
  gender: string | null
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface UserFavoritesResponse {
  id_user: number;
  favorite: MovieResponse[]
}