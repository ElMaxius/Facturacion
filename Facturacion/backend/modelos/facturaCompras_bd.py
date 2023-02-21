from modelos.proveedor_bd import ProveedorBd
from modelos.itemFacturaCompras_bd import ItemFacturaCompras_Bd
from database import BaseBd
from sqlalchemy import BIGINT, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class FacturaComprasBd(BaseBd):
    __tablename__ = "facturaCompras"

    numero = Column(Integer, primary_key=True) ##Lo cargo manual
    fecha= Column(DateTime, nullable=False)
    tipo_comprobante= Column(String, nullable=False)
    cuit_proveedor= Column(Integer, ForeignKey("proveedores.cuit"))
   
    total_general=Column(Float, nullable=False)

    proveedor=relationship("ProveedorBd")
    detalle= relationship("ItemFacturaCompras_Bd")

