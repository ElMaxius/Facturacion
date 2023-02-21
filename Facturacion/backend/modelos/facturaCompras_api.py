from datetime import date
from pydantic import BaseModel
from modelos.proveedor_api import ProveedorApi


class FacturaComprasSinNumero(BaseModel):
    fecha: date
    tipo_comprobante: str
    cuit_proveedor:int = None
    total_general: float

    class Config:
        orm_mode = True

class FacturaComprasLista(BaseModel):
    numero: int
    fecha: date
    tipo_comprobante: str
    proveedor:ProveedorApi
    total_general: float

    class Config:
        orm_mode = True

class FacturaComprasApi(FacturaComprasSinNumero):
    numero: int
