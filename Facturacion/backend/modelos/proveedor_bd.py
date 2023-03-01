from sqlalchemy import Column, String, BIGINT
from database import BaseBd


class ProveedorBd(BaseBd):
    __tablename__ = "proveedores"

    cuit = Column(BIGINT(), primary_key=True)
    nombre = Column(String(50), nullable=False)
    direccion = Column(String(50), nullable=False, default="NA")
    telefono = Column(String(20))
    localidad = Column(String(50), nullable=False, default ="NA")
