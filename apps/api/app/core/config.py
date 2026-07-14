from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    app_name: str = "INSPIRE API"
    database_url: str = "postgresql+psycopg://inspire:inspire@postgres:5432/inspire"
    redis_url: str = "redis://redis:6379/0"
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")
settings = Settings()
