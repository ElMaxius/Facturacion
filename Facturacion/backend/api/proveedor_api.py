from fastapi import APIRouter, Depends, HTTPException
from modelos.proveedor_api import ProveedorApi
from repositorios.proveedor_repo import ProveedorRepositorio
from database import get_db


proveedor_api = APIRouter(prefix='/proveedor', tags=['proveedores'])
repo = ProveedorRepositorio()

@proveedor_api.get('', response_model=list[ProveedorApi])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result


@proveedor_api.get('/{cuit}', response_model=ProveedorApi)
def get_by_id(cuit: int, db = Depends(get_db)):
    result = repo.get_by_id(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='proveedor no encontrado')
    
    return result

@proveedor_api.post('', response_model=ProveedorApi, status_code=201)
def agregar(datos:ProveedorApi, db = Depends(get_db,)):
    try:
        result = repo.agregar(db, datos)
        if result is None:
            raise HTTPException(status_code=404)
    except Exception as e:
        raise HTTPException(status_code=404, detail='no se pudo agregar el proveedor')
    return result

@proveedor_api.delete('/{cuit}', status_code=204)
def borrar(cuit:int, db = Depends(get_db)):
    result = repo.borrar(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='proveedor no encontrado')
    return result

@proveedor_api.put('/{cuit}', response_model=ProveedorApi)
def modificar(cuit:int, datos:ProveedorApi, db = Depends(get_db)):
    result = repo.modificar(db, cuit, datos)
    if result is None:
        raise HTTPException(status_code=404, detail='proveedor no encontrada')
    return result