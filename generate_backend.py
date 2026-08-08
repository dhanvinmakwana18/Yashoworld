import os

files = {
    "backend/config/settings.py": """
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "YashoWorld API"
    VERSION: str = "1.0.0"
    BACKEND_CORS_ORIGINS: list[str] = ["*"]
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./yashoworld.db")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    class Config:
        env_file = ".env"

settings = Settings()
""",
    "backend/main.py": """
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import products, orders, contact, gallery, chatbot, admin, health

app = FastAPI(
    title="YashoWorld API",
    description="Scalable production-ready backend for YashoWorld",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router, prefix="/health", tags=["Health"])
app.include_router(products.router, prefix="/products", tags=["Products"])
app.include_router(orders.router, prefix="/orders", tags=["Orders"])
app.include_router(contact.router, prefix="/contact", tags=["Contact"])
app.include_router(gallery.router, prefix="/gallery", tags=["Gallery"])
app.include_router(chatbot.router, prefix="/chatbot", tags=["Chatbot"])
app.include_router(admin.router, prefix="/admin", tags=["Admin"])
""",
    "backend/routers/health.py": """
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def health_check():
    return {"status": "ok", "message": "Backend is running."}
""",
    "backend/routers/products.py": """
from fastapi import APIRouter
from typing import List
from schemas.product import Product

router = APIRouter()

@router.get("/", response_model=List[Product])
async def get_products():
    return [
        {
            "id": "yw-sig-01",
            "name": "Custom Wedding Garland Preservation",
            "category": "Wedding Keepsakes",
            "description": "Preserve your wedding varmala.",
            "price": 3500.0,
            "image": "/images/artwork/hero_resin_frame.jpg",
            "availability": True
        }
    ]
""",
    "backend/schemas/product.py": """
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
""",
    "backend/routers/orders.py": """
from fastapi import APIRouter, UploadFile, File, Form
from typing import List, Optional
from schemas.order import OrderResponse

router = APIRouter()

@router.post("/", response_model=OrderResponse)
async def create_order(
    customer_name: str = Form(...),
    email: str = Form(...),
    whatsapp: str = Form(...),
    product: str = Form(...),
    custom_description: str = Form(...),
    occasion: str = Form(...),
    budget: str = Form(...),
    images: List[UploadFile] = File(default=[])
):
    # Save uploaded files logic here
    return {"status": "success", "message": "Order received."}
""",
    "backend/schemas/order.py": """
from pydantic import BaseModel

class OrderResponse(BaseModel):
    status: str
    message: str
""",
    "backend/routers/contact.py": """
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
""",
    "backend/routers/gallery.py": """
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_gallery():
    return [
        {"id": "gal-1", "image": "/images/artwork/flower_preservation.jpg", "category": "Resin Coasters"}
    ]
""",
    "backend/routers/admin.py": """
from fastapi import APIRouter

router = APIRouter()

@router.get("/orders")
async def get_admin_orders():
    return []

@router.get("/contacts")
async def get_admin_contacts():
    return []
""",
    "backend/routers/chatbot.py": """
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
""",
    "backend/chatbot/chatbot.py": """
from chatbot.intent import determine_intent
from chatbot.responses import generate_response

async def process_message(message: str, session_id: str):
    intent = determine_intent(message)
    reply = generate_response(intent, message)
    return {"reply": reply, "intent": intent}
""",
    "backend/chatbot/intent.py": """
def determine_intent(message: str) -> str:
    msg_lower = message.lower()
    if "price" in msg_lower or "cost" in msg_lower:
        return "pricing"
    if "order" in msg_lower or "buy" in msg_lower:
        return "ordering"
    if "flower" in msg_lower or "preservation" in msg_lower:
        return "flower_preservation"
    return "general_faq"
""",
    "backend/chatbot/responses.py": """
from chatbot.faq import get_faq_answer
from chatbot.recommendations import get_recommendation

def generate_response(intent: str, message: str) -> str:
    if intent == "pricing":
        return "Our custom resin pieces start at ₹850 and vary based on size and customization."
    elif intent == "flower_preservation":
        return "We carefully dry your real flowers using silica gel, then cast them in multiple layers of UV-resistant crystal resin to preserve them forever."
    elif intent == "ordering":
        return "I can help you place an order! Could you share what kind of resin art you are looking for?"
    else:
        return get_faq_answer(message)
""",
    "backend/chatbot/faq.py": """
def get_faq_answer(message: str) -> str:
    return "I am the YashoWorld assistant! How can I help you discover beautiful handmade resin art today?"
""",
    "backend/chatbot/recommendations.py": """
def get_recommendation(keywords: list) -> str:
    return "Based on your interest, I recommend our Bestseller 'Forever' Rose Bookmark."
""",
    "backend/chatbot/prompts.py": """
SYSTEM_PROMPT = \"\"\"
You are a friendly and helpful assistant for YashoWorld, a premium handmade resin art business.
Answer FAQs, suggest products, explain resin art and flower preservation, and guide customers through ordering.
Do not immediately request a phone number. Collect order details only if the customer wants to order.
\"\"\"
""",
    "backend/requirements.txt": """
fastapi==0.103.1
uvicorn==0.23.2
pydantic==2.3.0
pydantic-settings==2.0.3
python-multipart==0.0.6
"""
}

for filepath, content in files.items():
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w") as f:
        f.write(content.strip())
        print(f"Created {filepath}")
