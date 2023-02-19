from sqlalchemy import Column, Float, Integer, String
from database import BaseBd


class ProductoBd(BaseBd):
    __tablename__ = "productos"

    codigo= Column(Integer, primary_key=True)
    nombre= Column(String(50), nullable=False)
    alicuotaIVA= Column(Float(50), nullable=False)
    precio= Column(Float(50), nullable=False)