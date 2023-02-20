from modelos.persona_bd import PersonaBd
from database import BaseBd
from sqlalchemy import BIGINT, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

class PresupuestoBd(BaseBd):
    __tablename__ = "presupuestos"

    numero = Column(Integer, primary_key=True)
    fecha_de_ingreso= Column(DateTime, nullable=False)
    valido_hasta= Column(Date, nullable=False)
    tipo_comprobante= Column(String, nullable=False)
    cuit_vendedor= Column(Integer, ForeignKey("personas.cuit"))
    vendedor=relationship("PersonaBd", Foreign_keys=cuit_vendedor, lazy="joined")
    cuit_cliente= Column(BIGINT, ForeignKey("personas.cuit"), nullable=False)
    cliente= relationship("PersonaBd",foreign_keys=cuit_cliente , lazy="joined")
    total_general=Column(Float, nullable=False)
