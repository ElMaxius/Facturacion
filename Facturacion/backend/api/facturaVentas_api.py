from fastapi import APIRouter, Depends, HTTPException
from repositorios.FacturaVentas_repo import FacturaVentasRepositorio
from modelos.facturaVentas_api import FacturaVentasApi
from modelos.facturaVentas_api import FacturaVentasLista
from datetime import date
from database import get_db


facturaVentas_api = APIRouter(prefix='/facturaVentas', tags=['FacturaVentas'])
repo = FacturaVentasRepositorio()

@facturaVentas_api.get('', response_model=list[FacturaVentasLista])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

@facturaVentas_api.get('/{numero}', response_model=FacturaVentasApi)
def get_by_id(numero: int, db = Depends(get_db)):
    result = repo.get_by_id(db, numero)
    if result is None:
        raise HTTPException(status_code=404, detail='Factura no encontrada')
    
    return result

@facturaVentas_api.post('', response_model=FacturaVentasApi, status_code=201)
def agregar(datos:FacturaVentasApi, db = Depends(get_db)):
    try:
        result = repo.agregar(db, datos)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return result

@facturaVentas_api.get('/{desde}/{hasta}', response_model=list[FacturaVentasLista])
def get_FacturaVentasPorFecha(desde= date, hasta=date, db=Depends(get_db)):
    result = repo.get_FacturaVentasPorFecha(db, desde, hasta)
    if result is None:
        raise HTTPException(status_code=404, detail='Factura no encontrada')
    return result

