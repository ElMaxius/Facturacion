from pydantic import BaseModel


class DetalleComprasSinId(BaseModel):
    numero_factura_compra: int
    codigo_producto: int
    descripcion_producto: str
    cantidad: int
    p_u: float
    iva: float
    subtotal: float

    class Config:
        orm_mode = True


class DetalleComprasApi(DetalleComprasSinId):
    id: int
