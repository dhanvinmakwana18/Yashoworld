from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    id: str
    name: str
    category: str
    description: str
    price: float
    image: str
    availability: bool