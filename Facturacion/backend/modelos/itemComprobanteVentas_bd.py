from database import BaseBd
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy import Column, Integer, Date, ForeignKey, String

class itemComprobanteVentas_bd(BaseBd):
    __tablename__ = "itemComprobante_Ventas"

    numero = Column(Integer, primary_key=True)
    letra = Column(String(1), nullable=False)
    nro_presupuesto = Column(ForeignKey('presupuestos.numero'))
    presupuesto = relationship('Presupuesto_bd')

    cuit_vendedor = Column(ForeignKey('personas.cuit'), nullable=False)
    vendedor = relationship('persona_bd', lazy="joined", foreign_keys=[cuit_vendedor])

    cuit_cliente = Column(ForeignKey('personas.cuit'), nullable=False)
    cliente = relationship('persona_bd', lazy='joined', foreign_keys=[cuit_cliente])

    fecha = Column(Date)