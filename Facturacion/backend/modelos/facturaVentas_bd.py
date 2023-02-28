from database import BaseBd
from sqlalchemy import BIGINT, Column, Date, DateTime, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from modelos.vendedor_bd import VendedorBd
from modelos.cliente_bd import ClienteBd
from modelos.itemFacturaVentas_bd import ItemFacturaVentas_bd

class FacturaVentasBd(BaseBd):
    __tablename__ = "facturaVentas"
    
    numero = Column(BIGINT, primary_key=True) 
    fecha= Column(DateTime, nullable=False)
    tipo_comprobante= Column(String, nullable=False)
    numero_presupuesto= Column(Integer, ForeignKey("presupuestos.numero"),nullable=True)
    cuit_vendedor= Column(Integer, ForeignKey("vendedores.cuit"), nullable=False)
    cuit_cliente= Column(Integer, ForeignKey("clientes.cuit"), nullable=False)
    total_general=Column(Float, nullable=False)

    vendedor=relationship("VendedorBd")
    cliente=relationship("ClienteBd")
    presupuesto=relationship("PresupuestoBd")
    ##detalle= relationship("ItemFacturaVentas_Bd")

