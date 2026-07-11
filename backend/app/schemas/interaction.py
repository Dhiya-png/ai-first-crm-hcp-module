from pydantic import BaseModel
from datetime import date
from typing import Optional


class InteractionBase(BaseModel):
    hcp_id: int
    interaction_date: date
    discussion: str
    products: Optional[str] = None
    summary: Optional[str] = None
    follow_up_date: Optional[date] = None


class InteractionCreate(InteractionBase):
    pass


class InteractionResponse(InteractionBase):
    id: int

    class Config:
        from_attributes = True