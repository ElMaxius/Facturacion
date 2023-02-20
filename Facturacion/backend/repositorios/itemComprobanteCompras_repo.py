from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.itemComprobanteCompras_bd import itemComprobanteCompras_bd
from modelos.itemComprobanteCompras_api import DetalleComprasModel


class itemComprobanteCompras():

    def get_all(self, session: Session):
        return session.execute(select(itemComprobanteCompras_bd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        detalle = session.get(itemComprobanteCompras_bd, id)
        if detalle:
            return detalle
        else:
            ValueError("No se encontró el detalle")

    def save(self, datos: DetalleComprasModel, session: Session):
        detalle = itemComprobanteCompras_bd(**datos.dict())
        session.add(detalle)
        session.commit()
        return detalle