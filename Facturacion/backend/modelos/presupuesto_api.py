from datetime import date
from pydantic import BaseModel


class PresupuestoSinNumero(BaseModel):
    fecha_de_ingreso: date
    valido_hasta: date
    tipo_comprobante: str
    vendedor: str
    cliente: str
    direccion: str
    telefono: int
    cuit_cliente: int
    localidad: int
    total_general: float

    class Config:
        orm_mode = True

class PresupuestoApi(PresupuestoSinNumero):
    numero: int