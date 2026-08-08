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