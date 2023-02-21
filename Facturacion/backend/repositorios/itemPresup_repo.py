from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.itemComprobantePresup_bd import itemComprobantePresup_bd
from modelos.itemComprobantePresup_api import itemComprobantePresupuesto


class itemComprobantePresupuesto():

    def get_all(self, session: Session):
        return session.execute(select(itemComprobantePresup_bd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        detalle = session.get(itemComprobantePresup_bd, id)
        if detalle:
            return detalle
        else:
            ValueError("No se encontró el detalle")

    def save(self, datos: itemComprobantePresupuesto, session: Session):
        detalle = itemComprobantePresup_bd(**datos.dict())
        session.add(detalle)
        session.commit()
        return detalle
