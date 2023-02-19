from pydantic import BaseModel


class ProductoSinCodigo(BaseModel):
    nombre: str
    alicuotaIVA: float
    precio: float

    class Config:
        orm_mode = True

class ProductoApi(ProductoSinCodigo):
    codigo: str