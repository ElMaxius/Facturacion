from pydantic import BaseModel
from modelos.producto_api import ProductoApi

class ItemPresupuestoSinId(BaseModel):
    numero_presupuesto: int
    codigo_producto: int
    cantidad: int
    subtotal: float

    class Config:
        orm_mode = True

class ItemPresupuestoLista(BaseModel):
    id: int
    numero_presupuesto: int
    producto: ProductoApi
    cantidad: int
    subtotal: float

    class Config:
        orm_mode = True

class ItemPresupuestoApi(ItemPresupuestoSinId):
    id: int