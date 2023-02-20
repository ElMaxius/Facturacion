from modelos.proveedor_bd import ProveedorBd
from database import BaseBd
from sqlalchemy import BIGINT, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class PresupuestoBd(BaseBd):
    __tablename__ = "presupuestos"

    numero = Column(Integer, primary_key=True)
    fecha_de_ingreso= Column(DateTime, nullable=False)
    valido_hasta= Column(Date, nullable=False)
    tipo_comprobante= Column(String, nullable=False)
    cuit_vendedor= Column(Integer, ForeignKey("vendedores.cuit"))
    vendedor=relationship("VendedorBd")
    cuit_cliente= Column(BIGINT, ForeignKey("clientes.cuit"), nullable=False)
    cliente= relationship("ClienteBd")
    total_general=Column(Float, nullable=False)


