from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, ForeignKey


class ItemPresup_bd(BaseBd):
    __tablename__ = "itemPresupuesto"
   
    id=Column(Integer, primary_key=True)
    numero_presupuesto = Column(Integer, ForeignKey("presupuestos.numero"))
    presupuesto = relationship("PresupuestoBd")

    codigo_producto = Column(Integer, ForeignKey("productos.codigo"))
    producto = relationship("ProductoBd")
    
    cantidad = Column(Integer)
