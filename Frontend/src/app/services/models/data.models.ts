
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