from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.itemFacturaCompras_bd import ItemFacturaCompras_Bd
from modelos.itemFacturaCompras_api import DetalleComprasSinId


class itemComprobanteCompras():

    def get_all(self, session: Session):
        return session.execute(select(ItemFacturaCompras_Bd)).scalars().all()

    def get_by_id(self, id: int, session: Session):
        detalle = session.get(ItemFacturaCompras_Bd, id)
        if detalle:
            return detalle
        else:
            ValueError("No se encontró el detalle")

    def agregar(self, datos: DetalleComprasSinId, db: Session):
        detalle = ItemFacturaCompras_Bd(**datos.dict())
        db.add(detalle)
        db.commit()
        return detalle