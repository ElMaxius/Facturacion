from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey, Float



class ItemPresup_bd(BaseBd):
    __tablename__ = "itemPresupuesto"
   
    id=Column(Integer, primary_key=True)
    numero_presupuesto = Column(Integer, ForeignKey("presupuestos.numero"), nullable=False)
    presupuesto = relationship("PresupuestoBd")

    codigo_producto = Column(Integer, ForeignKey("productos.codigo"), nullable=False)   
    producto = relationship("ProductoBd")
    
    cantidad = Column(Integer, nullable=False)
    subtotal = Column(Float, nullable=False)
