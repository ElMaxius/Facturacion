from datetime import date
from sqlalchemy import inspect, select, and_
from sqlalchemy.orm import Session
from modelos.facturaCompras_api import FacturaComprasSinNumero
from modelos.facturaCompras_api import FacturaComprasApi
from modelos.facturaCompras_bd import FacturaComprasBd
from sqlalchemy.exc import IntegrityError


class FacturaComprasRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(FacturaComprasBd)).scalars().all()
    
    def get_FacturaComprasPorFecha(self, db: Session, fecha_desde: date, fecha_hasta: date):
        return db.execute(select(FacturaComprasBd).where(
            and_(
            FacturaComprasBd.fecha>=fecha_desde, 
            FacturaComprasBd.fecha<=fecha_hasta))).scalars().all()
    
    def get_by_id(self, db: Session, numero:int):
        result = db.execute(select(FacturaComprasBd).where(FacturaComprasBd.numero == numero)).scalar()
        return result
    
    def agregar(self, db: Session, datos: FacturaComprasApi):
        nueva_facturaCompra_Bd: FacturaComprasBd = FacturaComprasBd(**datos.dict())
        try:
            db.add(nueva_facturaCompra_Bd)
            db.commit()
        except  IntegrityError as e:
            raise RuntimeError(f"No se ha podido agregar la Factura:{e}")
        return nueva_facturaCompra_Bd
    
    def modificar(self, db:Session, numero:int, datos:FacturaComprasSinNumero):
        objeto:FacturaComprasBd = self.get_by_id(db, numero)
        if objeto is None:
            return None
        else:
            for k, v in datos.dict(exclude_unset=True).items():
                setattr(objeto, k, v)
        db.commit()
        return objeto
    
