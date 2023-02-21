from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, Date, ForeignKey, String

class ItemFacturaVentas_bd(BaseBd):
    __tablename__ = "itemFacturaVentas"

    numero = Column(Integer, primary_key=True)
    letra = Column(String(1), nullable=False)
    nro_presupuesto = Column(ForeignKey('presupuestos.numero'))
    presupuesto = relationship('PresupuestoBd')

    cuit_vendedor = Column(ForeignKey('vendedores.cuit'), nullable=False)
    vendedor = relationship('VendedorBd')

    cuit_cliente = Column(ForeignKey('clientes.cuit'), nullable=False)
    cliente = relationship('ClienteBd')

    fecha = Column(Date)