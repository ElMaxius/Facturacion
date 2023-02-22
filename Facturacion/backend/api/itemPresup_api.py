from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from repositorios.itemPresup_repo import ItemPresupuestoRepositorio
from database import get_db
from modelos.itemPresup_api import ItemPresupuestoApi, ItemPresupuestoSinId, ItemPresupuestoLista


itemPresupuesto_api = APIRouter(prefix='/itemPresupuestos', tags=['Item_Presupuestos'])
repo = ItemPresupuestoRepositorio()


@itemPresupuesto_api.get('/', response_model=list[ItemPresupuestoLista])
def get_all(db: Session = Depends(get_db)):
    return repo.get_all(db)


@itemPresupuesto_api.get('/{id}', response_model=ItemPresupuestoLista)
def get_by_id(id: int, db = Depends(get_db)):
    result = repo.get_by_id(db, id)
    if result is None:
        raise HTTPException(status_code=404, detail='item no encontrado')
    return result


@itemPresupuesto_api.post('/', response_model=ItemPresupuestoLista)
def agregar(datos: ItemPresupuestoSinId, db: Session = Depends(get_db)):
    detalle = repo.agregar(datos, db)
    return detalle

@itemPresupuesto_api.delete('/{id}', status_code=204)
def borrar(id:int, db = Depends(get_db)):
    result = repo.borrar(db, id)
    if result is None:
        raise HTTPException(status_code=404, detail='item no encontrado')
    return result