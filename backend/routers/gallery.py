from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_gallery():
    return [
        {"id": "gal-1", "image": "/images/artwork/flower_preservation.jpg", "category": "Resin Coasters"}
    ]