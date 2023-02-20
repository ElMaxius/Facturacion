from datetime import date
from pydantic import BaseModel
from modelos.vendedor_api import VendedorApi
from modelos.cliente_api import ClienteApi




class PresupuestoSinNumero(BaseModel):
    fecha_de_ingreso: date
    valido_hasta: date
    tipo_comprobante: str
    cuit_vendedor:int = None
    cuit_cliente: int = None
    total_general: float

    class Config:
        orm_mode = True

class PresupuestoLista(BaseModel):
    numero: int
    fecha_de_ingreso: date
    valido_hasta: date
    tipo_comprobante: str
    vendedor:VendedorApi
    cliente: ClienteApi
    total_general: float

    class Config:
        orm_mode = True

class PresupuestoApi(PresupuestoSinNumero):
    numero: int
