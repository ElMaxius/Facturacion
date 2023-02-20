from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, Date, ForeignKey

class itemComprobanteCompras_bd(BaseBd):
    __tablename__ = "itemComprobante_Compras"
   
    numero_factura_compra = Column(Integer, ForeignKey("facturas_compras.numero"), primary_key=True)
    factura_compra = relationship("FacturaCompraBd")

    codigo_producto = Column(Integer, ForeignKey("productos.codigo"))
    producto = relationship("ProductoBd")
    
    cantidad = Column(Integer)
