from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositorios.itemFacturaVentas_repo import ItemFacturaVentasRepositorio
from database import get_db
from datetime import date
from modelos.itemFacturaVentas_api import ItemFacturaVentasApi, ItemFacturaVentas, ItemFacturaVentasLista, ItemFacturaVentasFechas


itemFacturaVentas_api = APIRouter(prefix='/itemFacturaVentas', tags=['Item_Factura_Ventas'])
repo = ItemFacturaVentasRepositorio()


@itemFacturaVentas_api.get('/', response_model=list[ItemFacturaVentasLista])
def get_all(db: Session = Depends(get_db)):
    return repo.get_all(db)


@itemFacturaVentas_api.get('/{numeroFacturaVenta}', response_model=list[ItemFacturaVentasLista])
def get_by_id(numeroFacturaVenta: int, db = Depends(get_db)):
    result = repo.get_by_id(db, numeroFacturaVenta)
    if result is None:
        raise HTTPException(status_code=404, detail='item no encontrado')
    return result

# @itemFacturaVentas_api.get('/{desde}/{hasta}', response_model=list[ItemFacturaVentasFechas])
# def get_ItemsPorFecha(desde= date, hasta=date, db=Depends(get_db)):
#     result = repo.get_ItemsPorFecha(desde, hasta, db)
#     if result is None:
#         raise HTTPException(status_code=404, detail='no se encontraron ventas')
#     return result

@itemFacturaVentas_api.get('/{desde}/{hasta}', response_model=list[ItemFacturaVentasFechas])
def get_ItemsPorFecha(desde: date, hasta: date, db: Session = Depends(get_db)):
    result = repo.get_ItemsPorFecha(desde, hasta, db)
    if result is None:
        raise HTTPException(status_code=404, detail='no se encontraron ventas')
    return result


@itemFacturaVentas_api.post('/', response_model=ItemFacturaVentasApi)
def agregar(datos: ItemFacturaVentas, db: Session = Depends(get_db)):
    detalle = repo.agregar(datos, db)
    return detalle