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