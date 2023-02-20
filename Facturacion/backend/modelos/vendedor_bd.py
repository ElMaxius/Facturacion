from sqlalchemy import Column, String, BIGINT
from database import BaseBd


class VendedorBd(BaseBd):
    __tablename__ = "vendedores"

    cuit = Column(BIGINT(), primary_key=True)
    nombre = Column(String(50), nullable=False)
    direccion = Column(String(50), nullable=False, default="NA")
    telefono = Column(String, nullable=True)
    localidad = Column(String(50), nullable=False, default ="NA")
