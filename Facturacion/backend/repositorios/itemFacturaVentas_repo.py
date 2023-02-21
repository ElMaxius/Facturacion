# from sqlalchemy import select, and_
# from sqlalchemy.orm import Session
# from modelos.itemComprobanteVentas_bd import itemComprobanteVentas_bd
# from api.itemComprobanteVentas_api import  itemComprobanteVentas
# from modelos.facturas_ventas import FacturaVentaBd, FacturaVentaModel


# class itemComprobanteVentas():

#     def get_all(self, session: Session):
#         return session.execute(select(itemComprobanteVentas_bd)).scalars().all()

#     def get_Items(self, fechadesde, fechahasta, session: Session):
       
#         return session.execute(select(itemComprobanteVentas_bd).where(and_((FacturaVentaBd.numero==itemComprobanteVentas_bd.numero_factura_venta),(fechadesde < FacturaVentaBd.fecha), (FacturaVentaBd.fecha < fechahasta)))).scalars().all()

#     def get_by_id(self, id: int, session: Session):
#         detalle = session.get(itemComprobanteVentas_bd, id)
#         if detalle:
#             return detalle
#         else:
#             ValueError("No se encontró el detalle")

#     def save(self, datos: itemComprobanteVentas, session: Session):
#         detalle = itemComprobanteVentas_bd(**datos.dict())
#         session.add(detalle)
#         session.commit()
#         return detalle
