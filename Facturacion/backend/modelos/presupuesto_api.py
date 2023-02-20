from datetime import date
from pydantic import BaseModel
from modelos.vendedor_api import VendedorApi
from modelos.cliente_api import ClienteApi




class PresupuestoSinNumero(BaseModel):
    fecha_de_ingreso: date
    valido_hasta: date
    tipo_comprobante: str
    vendedor: VendedorApi
    cuit_vendedor:int
    cliente: ClienteApi
    cuit_cliente: int
    total_general: float

    class Config:
        orm_mode = True

class PresupuestoApi(PresupuestoSinNumero):
    numero: int
