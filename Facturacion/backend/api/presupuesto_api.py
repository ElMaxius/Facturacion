from fastapi import APIRouter, Depends, HTTPException
from modelos.presupuesto_api import PresupuestoLista, PresupuestoApi
from repositorios.presupuesto_repo import PresupuestoRepositorio
from datetime import date
from database import get_db


presupuesto_api = APIRouter(prefix='/presupuesto', tags=['Presupuestos'])
repo = PresupuestoRepositorio()

@presupuesto_api.get('', response_model=list[PresupuestoLista])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

@presupuesto_api.get('/{desde}/{hasta}', response_model=list[PresupuestoLista])
def get_presupuestoPorFecha(desde= date, hasta=date, db=Depends(get_db)):
    result = repo.get_presupuestoPorFecha(db, desde, hasta)
    if result is None:
        raise HTTPException(status_code=404, detail='Presupuesto no encontrado')
    return result

@presupuesto_api.post('', response_model=PresupuestoApi, status_code=201)
def agregar(datos:PresupuestoApi, db = Depends(get_db)):
    try:
        result = repo.agregar(db, datos)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return result

@presupuesto_api.get('/{numero}', response_model=PresupuestoLista)
def get_by_id(numero: int, db = Depends(get_db)):
    result = repo.get_by_id(db, numero)
    if result is None:
        raise HTTPException(status_code=404, detail='Presupuesto no encontrado')
    return result