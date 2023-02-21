from pydantic import BaseModel

class ItemPresupuestoSinId(BaseModel):
    numero_presupuesto: int
    codigo_producto: int
    descripcion_producto: str
    cantidad: int
    p_u: float
    subtotal: float

    class Config:
        orm_mode = True


class DetallePresupuestosApi(ItemPresupuestoSinId):
    id: int