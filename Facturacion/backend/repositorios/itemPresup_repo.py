from sqlalchemy.orm import Session
from sqlalchemy import select
from modelos.itemPresup_bd import ItemPresup_bd
from modelos.itemPresup_api import ItemPresupuestoApi
from sqlalchemy.exc import IntegrityError


class ItemPresupuestoRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(ItemPresup_bd)).scalars().all()

    def get_by_id(self, db: Session, numeroPresupuesto:int):
        result = db.execute(select(ItemPresup_bd).where(ItemPresup_bd.numero_presupuesto == numeroPresupuesto)).scalars().all()
        return result

    def agregar(self, datos: ItemPresupuestoApi, db: Session):
        detalle = ItemPresup_bd(**datos.dict())
        try:
            db.add(detalle)
            db.commit()
        except  IntegrityError as e:
            raise RuntimeError(f"No se ha podido agregar el item:{e}")
        return detalle
    
    def borrar(self, db:Session, id:int):
        objeto = self.get_by_id(db, id)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto