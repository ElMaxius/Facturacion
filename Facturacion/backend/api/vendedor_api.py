from fastapi import APIRouter, Depends, HTTPException
from modelos.vendedor_api import VendedorApi
from repositorios.vendedor_repo import VendedorRepositorio
from database import get_db


vendedor_api = APIRouter(prefix='/vendedor', tags=['vendedors'])
repo = VendedorRepositorio()

@vendedor_api.get('', response_model=list[VendedorApi])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result


@vendedor_api.get('/{cuit}', response_model=VendedorApi)
def get_by_id(cuit: int, db = Depends(get_db)):
    result = repo.get_by_id(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='vendedor no encontrado')
    
    return result

@vendedor_api.post('', response_model=VendedorApi, status_code=201)
def agregar(datos:VendedorApi, db = Depends(get_db,)):
    try:
        result = repo.agregar(db, datos)
        if result is None:
            raise HTTPException(status_code=404)
    except Exception as e:
        raise HTTPException(status_code=404, detail='no se pudo agregar el vendedor')
    return result

@vendedor_api.delete('/{cuit}', status_code=204)
def borrar(cuit:int, db = Depends(get_db)):
    result = repo.borrar(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='vendedor no encontrado')
    return result

@vendedor_api.put('/{cuit}', response_model=VendedorApi)
def modificar(cuit:int, datos:VendedorApi, db = Depends(get_db)):
    result = repo.modificar(db, cuit, datos)
    if result is None:
        raise HTTPException(status_code=404, detail='vendedor no encontrada')
    return result