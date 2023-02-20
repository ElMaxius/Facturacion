from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, ForeignKey


class itemComprobantePresup_bd(BaseBd):
    __tablename__ = "itemComprobante_Presupuesto"
   
    numero_presupuesto = Column(Integer, ForeignKey("presupuestos.numero"), primary_key=True)
    presupuesto = relationship("Presupuesto_bd")

    codigo_producto = Column(Integer, ForeignKey("productos.codigo"))
    producto = relationship("producto_bd")
    
    cantidad = Column(Integer)
