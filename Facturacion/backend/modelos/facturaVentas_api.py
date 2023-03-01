from datetime import date
from pydantic import BaseModel
from modelos.presupuesto_api import PresupuestoApi
from modelos.vendedor_api import VendedorApi
from modelos.cliente_api import ClienteApi


class FacturaVentasApi(BaseModel):
    numero:int
    fecha: date
    tipo_comprobante: str
    numero_presupuesto:int = None
    cuit_vendedor:int = None
    cuit_cliente:int 
    total_general: float

    class Config:
        orm_mode = True

class FacturaVentasLista(BaseModel):
    numero: int
    fecha: date
    tipo_comprobante: str
    presupuesto: PresupuestoApi = None
    vendedor: VendedorApi 
    cliente: ClienteApi 
    total_general: float

    class Config:
        orm_mode = True


