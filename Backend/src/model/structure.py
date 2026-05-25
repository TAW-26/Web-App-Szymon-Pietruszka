from typing import List
from pydantic import BaseModel, field_validator

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

    class Config:
        from_attributes = True
        
    @field_validator("genres", "actors", mode="before")
    @classmethod
    def serialize(cls, value):
        if isinstance(value, list):
            return [g.name if hasattr(g, "name") else g.get("name") for g in value]
        
        return value
    