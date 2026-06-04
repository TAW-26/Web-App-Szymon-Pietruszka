from typing import List
from pydantic import BaseModel, field_validator, Field
from datetime import date
from typing import Optional

class ShortDataMovieResponseSchema(BaseModel):
    title: str
    rating: float

    class Config:
        from_attributes = True

class ReviewResponseSchema(BaseModel):
    id_user: int
    text: str
    created_at: date
    id_movie: ShortDataMovieResponseSchema = Field(validation_alias="movie_data")

    class Config:
        from_attributes = True
        populate_by_name = True

class ShortReviewResponseSchema(BaseModel):
    text: str
    created_at: date
    nickname: str = Field(validation_alias="user_data")

    class Config:
        from_attributes = True
        populate_by_name = True
    
    @field_validator("nickname", mode="before")
    @classmethod
    def get_nickname_from_obj(cls, value):
        if hasattr(value, "nickname"):
            return value.nickname
        return value

class MovieResponseSchema(BaseModel):
    id_movie: int
    title: str
    description: str
    director: str
    composer: str
    poster: str | None = None
    production: str
    year: int
    rating: float
    genres: List[str]
    actors: List[str]
    reviews: List[ShortReviewResponseSchema]

    class Config:
        from_attributes = True
        
    @field_validator("genres", "actors", mode="before")
    @classmethod
    def serialize(cls, value):
        if isinstance(value, list):
            return [g.name if hasattr(g, "name") else g.get("name") for g in value]
        
        return value
    
class FavoriteResponseSchema(BaseModel):
    id_user: int
    favorite: List[MovieResponseSchema]

    class Config:
        from_attributes = True

class ReviewResponseSchema(BaseModel):
    id_user: int
    text: str
    created_at: date
    id_movie: ShortDataMovieResponseSchema = Field(validation_alias="movie_data")

    class Config:
        from_attributes = True
        populate_by_name = True

class UserReviewsResponseSchema(BaseModel):
    id_user: int
    review: List[ReviewResponseSchema]

    class Config:
        from_attributes = True

class CreateNewReviewSchema(BaseModel):
    id_movie: int
    text: str

class RatingResponseSchema(BaseModel):
    rating: int
    id_movie: ShortDataMovieResponseSchema = Field(validation_alias="movie_data")

    class Config:
        from_attributes = True
        populate_by_name = True

class CreateRatingSchema(BaseModel):
    id_movie: int
    rating: int

class UserRatingResponseSchema(BaseModel):
    id_user: int
    ratings: List[RatingResponseSchema]

    class Config:
        from_attributes = True

class UpdateDataUserSchema(BaseModel):
    id_user: int
    name: Optional[str] = None
    birthdate: Optional[date] = None
    gender: Optional[str] = None
    password: Optional[str] = None

class UserResponeSchema(BaseModel):
    email: str
    nickname: str
    password: str

    class Config:
        from_attributes = True

class UserDataResponeSchema(BaseModel):
    nickname: str
    name: Optional[str] = None
    email: str
    birthdate: Optional[date] = None
    gender: Optional[str] = None

    class Config:
        from_attributes = True

class LoginSchema(BaseModel):
    nickname: str
    password: str