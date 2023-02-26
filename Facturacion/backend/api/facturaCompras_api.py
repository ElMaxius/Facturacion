from fastapi import APIRouter, Depends, HTTPException
from modelos.facturaCompras_api import FacturaComprasSinNumero
from repositorios.FacturaCompras_repo import FacturaComprasRepositorio
from modelos.facturaCompras_api import FacturaComprasApi
from modelos.facturaCompras_api import FacturaComprasLista
from datetime import date
from database import get_db


facturaCompras_api = APIRouter(prefix='/facturaCompras', tags=['FacturaCompras'])
repo = FacturaComprasRepositorio()

@facturaCompras_api.get('', response_model=list[FacturaComprasLista])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

@facturaCompras_api.get('/{numero}', response_model=FacturaComprasLista)
def get_by_id(numero: int, db = Depends(get_db)):
    result = repo.get_by_id(db, numero)
    if result is None:
        raise HTTPException(status_code=404, detail='Factura no encontrada')
    
    return result

@facturaCompras_api.post('', response_model=FacturaComprasApi, status_code=201)
def agregar(datos:FacturaComprasApi, db = Depends(get_db)):
    try:
        result = repo.agregar(db, datos)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return result

@facturaCompras_api.get('/{desde}/{hasta}', response_model=list[FacturaComprasLista])
def get_FacturaComprasPorFecha(desde= date, hasta=date, db=Depends(get_db)):
    result = repo.get_FacturaComprasPorFecha(db, desde, hasta)
    if result is None:
        raise HTTPException(status_code=404, detail='Factura no encontrada')
    return result

@facturaCompras_api.put('/{numero}', response_model=FacturaComprasSinNumero)
def modificar(numero:int, datos:FacturaComprasApi, db = Depends(get_db)):
    result = repo.modificar(db, numero, datos)
    if result is None:
        raise HTTPException(status_code=404, detail='Factura no encontrada')
    return result