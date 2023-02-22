from sqlalchemy import select, and_
from sqlalchemy.orm import Session
from modelos.itemFacturaVentas_bd import ItemFacturaVentas_bd
from modelos.itemFacturaVentas_api import ItemFacturaVentasApi
from modelos.facturaVentas_bd import FacturaVentasBd


class ItemFacturaVentasRepositorio():

    def get_all(self, db: Session):
        return db.execute(select(ItemFacturaVentas_bd)).scalars().all()

    def get_ItemsPorFecha(self, fechadesde, fechahasta, db: Session):
        return db.execute(select(ItemFacturaVentas_bd).where(and_((FacturaVentasBd.numero==ItemFacturaVentas_bd.numero_facturaVenta),
                                (fechadesde < FacturaVentasBd.fecha), (FacturaVentasBd.fecha < fechahasta)))).scalars().all()

    def get_by_id(self, db: Session, numeroFacturaVenta:int):
        result = db.execute(select(ItemFacturaVentas_bd).where(ItemFacturaVentas_bd.numero_facturaVenta == numeroFacturaVenta)).scalar()
        return result

    def agregar(self, datos: ItemFacturaVentasApi, db: Session):
        item = ItemFacturaVentas_bd(**datos.dict())
        db.add(item)
        db.commit()
        return item
