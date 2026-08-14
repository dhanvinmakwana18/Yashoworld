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