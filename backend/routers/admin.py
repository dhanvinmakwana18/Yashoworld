from fastapi import APIRouter

router = APIRouter()

@router.get("/orders")
async def get_admin_orders():
    return []

@router.get("/contacts")
async def get_admin_contacts():
    return []