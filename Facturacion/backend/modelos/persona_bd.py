from sqlalchemy import Column, String, BIGINT
from database import BaseBd


class PersonaBd(BaseBd):
    __tablename__ = "personas"

    cuit = Column(BIGINT(), primary_key=True)
    nombre = Column(String(50), nullable=False)
    direccion = Column(String(50), nullable=False, default="NA")
    telefono = Column(String, nullable=True)
    localidad = Column(String(50), nullable=False, default ="NA")
    tipo = Column(String(1), nullable=False)