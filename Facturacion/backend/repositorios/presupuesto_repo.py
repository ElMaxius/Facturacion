from datetime import date
from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from modelos.presupuesto_api import PresupuestoSinNumero
from modelos.presupuesto_bd import PresupuestoBd
from sqlalchemy.exc import IntegrityError


class PresupuestoRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(PresupuestoBd)).scalars().all()
    
    def get_presupuestoPorFecha(self, db: Session, fecha_desde: date, fecha_hasta: date):
        return db.execute(select(PresupuestoBd).where(and_(PresupuestoBd.fecha_de_ingreso>=fecha_desde, PresupuestoBd.fecha_de_ingreso<=fecha_hasta))).scalars().all()
    
    def get_by_id(self, db: Session, numero:int):
        result = db.execute(select(PresupuestoBd).where(PresupuestoBd.numero == numero)).scalar()
        return result
    
    def agregar(self, db: Session, datos: PresupuestoSinNumero):
        nuevo_Presupuesto_db: PresupuestoBd = PresupuestoBd(**datos.dict())
        try:
            db.add(nuevo_Presupuesto_db)
            db.commit()
        except  IntegrityError as e:
            raise RuntimeError("No se ha podido agregar el Presupuesto".format(e))
        return nuevo_Presupuesto_db