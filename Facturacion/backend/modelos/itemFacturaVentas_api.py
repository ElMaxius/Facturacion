from pydantic import BaseModel
from modelos.producto_api import ProductoApi


class ItemFacturaVentas(BaseModel):
    numero_facturaVenta: int
    codigo_producto: int
    cantidad: int
    subtotal: int

    class Config:
        orm_mode = True

class ItemFacturaVentasLista(BaseModel):
    id: int
    numero_facturaVenta: int
    codigo_producto: int
    producto: ProductoApi
    cantidad: int
    subtotal: int

    class Config:
        orm_mode = True


class ItemFacturaVentasApi(ItemFacturaVentas):
    id: int

