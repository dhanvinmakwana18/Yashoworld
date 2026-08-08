from pydantic import BaseModel

class OrderResponse(BaseModel):
    status: str
    message: str