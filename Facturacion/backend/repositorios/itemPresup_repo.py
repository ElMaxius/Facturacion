from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.itemPresup_bd import ItemPresup_bd
from modelos.itemPresup_api import DetallePresupuestosApi
from sqlalchemy.exc import IntegrityError


class ItemPresupuestoRepositorio():

    def get_all(self, session: Session):
        return session.execute(select(ItemPresup_bd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        detalle = session.get(ItemPresup_bd, id)
        if detalle:
            return detalle
        else:
            ValueError("No se encontró el detalle")

    def agregar(self, datos: DetallePresupuestosApi, db: Session):
        detalle = ItemPresup_bd(**datos.dict())
        try:
            db.add(detalle)
            db.commit()
        except  IntegrityError as e:
            raise RuntimeError(f"No se ha podido agregar el detalle:{e}")
        return detalle
