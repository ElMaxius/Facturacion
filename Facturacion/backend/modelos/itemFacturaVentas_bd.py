from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, Date, ForeignKey, String

class ItemFacturaVentas_bd(BaseBd):
    __tablename__ = "itemFacturaVentas"

    id = Column(Integer, primary_key=True)
    numero_facturaVenta = Column(Integer, ForeignKey("facturaVentas.numero"))
    facturaVentas = relationship('FacturaVentasBd')
    codigo_producto = Column(Integer, ForeignKey('productos.codigo'), nullable=False)
    producto = relationship("ProductoBd")
    cantidad = Column(Integer, nullable=False)

    subtotal = Column(Integer)