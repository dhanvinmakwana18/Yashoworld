from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

@router.post("/")
async def submit_contact(req: ContactRequest):
    return {"status": "success", "message": "Contact message received."}