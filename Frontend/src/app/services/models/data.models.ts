export interface ReviewShortResponse {
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
  reviews: ReviewShortResponse[];
}

export interface MovieShortResponse {
  title: string;
  rating: number;
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

export interface UserReviewsResponse {
  id_user: number;
  review: ReviewItem[]
}

export interface ReviewItem {
  text: string;
  created_at: string;
  id_movie: MovieShortResponse;
}

export interface UserRatingItem {
  rating: number;
  id_movie: MovieShortResponse;
}

export interface UserRatingsResponse {
  id_user: number;
  ratings: UserRatingItem[];
}

export interface ActivityItem {
  title: string;
  movieRating: number;
  rating: number | null;
  text: string | null;
  createdAt: string;
}