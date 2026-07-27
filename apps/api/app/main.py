from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.availability import router as availability_router
from app.api.routes.cart import router as cart_router
from app.api.routes.catalogue import router as catalogue_router
from app.api.routes.health import router as health_router
from app.core.config import settings

app = FastAPI(title=settings.app_name, version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(catalogue_router, prefix="/api/v1")
app.include_router(cart_router, prefix="/api/v1")
app.include_router(availability_router, prefix="/api/v1")


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Bienvenue sur l'API INSPIRE"}
