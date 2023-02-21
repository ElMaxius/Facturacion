from pydantic import BaseModel

class itemComprobanteVentas(BaseModel):
    numero_factura_venta: int
    codigo_producto: int
    cantidad: int

    class Config:
        orm_mode = True


class DetalleVentasApi(itemComprobanteVentas):
    id: int