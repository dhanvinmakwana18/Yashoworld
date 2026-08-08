from fastapi import APIRouter
from pydantic import BaseModel
from chatbot.chatbot import process_message

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    session_id: str

@router.post("/")
async def chat_with_bot(req: ChatRequest):
    response = await process_message(req.message, req.session_id)
    return response