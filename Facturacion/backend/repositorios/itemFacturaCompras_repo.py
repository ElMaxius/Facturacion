from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.itemFacturaCompras_bd import ItemFacturaCompras_Bd
from modelos.itemFacturaCompras_api import ItemFacturaCompras


class ItemFacturaComprasRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(ItemFacturaCompras_Bd)).scalars().all()

    def get_by_id(self, db: Session, numeroFacturaCompra:int):
        result = db.execute(select(ItemFacturaCompras_Bd).where(ItemFacturaCompras_Bd.numero_factura_compra == numeroFacturaCompra)).scalars().all()
        return result

    def agregar(self, datos: ItemFacturaCompras, db: Session):
        item = ItemFacturaCompras_Bd(**datos.dict())
        db.add(item)
        db.commit()
        return item