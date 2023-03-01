from pydantic import BaseModel
from modelos.facturaVentas_api import FacturaVentasApi
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
    facturaVentas: FacturaVentasApi
    codigo_producto: int
    producto: ProductoApi
    cantidad: int
    subtotal: int

    class Config:
        orm_mode = True

class ItemFacturaVentasFechas(BaseModel):
    codigo_producto: int
    nombre: str
    cantidad: int
    total_general: int

    class Config:
        orm_mode = True



class ItemFacturaVentasApi(ItemFacturaVentas):
    id: int

