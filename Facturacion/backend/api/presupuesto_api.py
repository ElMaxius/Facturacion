from fastapi import APIRouter, Depends, HTTPException
from modelos.presupuesto_api import PresupuestoApi
from repositorios.presupuesto_repo import PresupuestoRepositorio
from database import get_db


presupuesto_api = APIRouter(prefix='/presupuesto', tags=['Presupuestos'])
repo = PresupuestoRepositorio()

@presupuesto_api.get('', response_model=list[PresupuestoApi])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

@presupuesto_api.post('', response_model=PresupuestoApi, status_code=201)
def agregar(datos:PresupuestoApi, db = Depends(get_db)):
    try:
        result = repo.agregar(db, datos)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return result