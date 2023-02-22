from pydantic import BaseModel
from modelos.producto_api import ProductoApi

class ItemFacturaCompras(BaseModel):
    numero_factura_compra: int
    codigo_producto: int
    cantidad: int
    subtotal: int

    class Config:
        orm_mode = True


class ItemFacturaComprasLista(BaseModel):
    id: int
    numero_factura_compra: int
    codigo_producto: int
    producto: ProductoApi
    cantidad: int
    subtotal: int

    class Config:
        orm_mode = True


class ItemFacturaComprasApi(ItemFacturaCompras):
    id: int

