from datetime import date
from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from modelos.facturaVentas_api import FacturaVentasApi
from modelos.facturaVentas_bd import FacturaVentasBd
from sqlalchemy.exc import IntegrityError


class FacturaVentasRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(FacturaVentasBd)).scalars().all()
    
    def get_FacturaVentasPorFecha(self, db: Session, fecha_desde: date, fecha_hasta: date):
        return db.execute(select(FacturaVentasBd).where(
            and_(
            FacturaVentasBd.fecha>=fecha_desde, 
            FacturaVentasBd.fecha<=fecha_hasta))).scalars().all()
    
    def get_by_id(self, db: Session, numero:int):
        result = db.execute(select(FacturaVentasBd).where(FacturaVentasBd.numero == numero)).scalar()
        return result
    
    def agregar(self, db: Session, datos: FacturaVentasApi):
        nueva_facturaVenta_Bd: FacturaVentasBd = FacturaVentasBd(**datos.dict())
        try:
            db.add(nueva_facturaVenta_Bd)
            db.commit()
        except  IntegrityError as e:
            raise RuntimeError(f"No se ha podido agregar la Factura:{e}")
        return nueva_facturaVenta_Bd
    
    