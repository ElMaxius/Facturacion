from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, ForeignKey

class ItemFacturaCompras_Bd(BaseBd):
    __tablename__ = "itemFacturaCompras"
   
    id = Column(Integer, primary_key=True)
    numero_factura_compra = Column(Integer, ForeignKey("facturaCompras.numero"))
    factura_compra = relationship("FacturaComprasBd")

    codigo_producto = Column(Integer, ForeignKey("productos.codigo"))
    producto = relationship("ProductoBd")

    cantidad = Column(Integer, nullable=False)

    subtotal = Column(Integer)