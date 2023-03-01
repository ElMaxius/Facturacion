from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositorios.itemFacturaCompras_repo import ItemFacturaComprasRepositorio
from database import get_db
from modelos.itemFacturaCompras_api import ItemFacturaComprasApi, ItemFacturaCompras, ItemFacturaComprasLista


itemFacturaCompras_api = APIRouter(prefix='/itemFacturaCompras', tags=['Item_Factura_Compras'])
repo = ItemFacturaComprasRepositorio()


@itemFacturaCompras_api.get('/', response_model=list[ItemFacturaComprasLista])
def get_all(db: Session = Depends(get_db)):
    return repo.get_all(db)


@itemFacturaCompras_api.get('/{numeroFacturaCompra}', response_model=list[ItemFacturaComprasLista])
def get_by_id(numeroFacturaCompra: int, db = Depends(get_db)):
    result = repo.get_by_id(db, numeroFacturaCompra)
    if result is None:
        raise HTTPException(status_code=404, detail='items no encontrados')
    return result


@itemFacturaCompras_api.post('/', response_model=ItemFacturaComprasApi)
def agregar(datos: ItemFacturaCompras, db: Session = Depends(get_db)):
    try:
        item = repo.agregar(datos, db)
    except Exception as e:
        raise HTTPException(status_code=404, detail='no se pudo agregar el item')
    return item