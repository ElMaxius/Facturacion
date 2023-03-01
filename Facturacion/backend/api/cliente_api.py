from fastapi import APIRouter, Depends, HTTPException
from modelos.cliente_api import ClienteApi
from repositorios.cliente_repo import ClienteRepositorio
from database import get_db


cliente_api = APIRouter(prefix='/cliente', tags=['clientes'])
repo = ClienteRepositorio()

@cliente_api.get('', response_model=list[ClienteApi])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

##@cliente_api.get('/proveedores', response_model=list[clienteApi])
##def get_all_proveedores(db = Depends(get_db)):
##    result = repo.get_all_proveedores(db)
##    return result

##@cliente_api.get('/clientes', response_model=list[ClienteApi])
##def get_all_clientes(db = Depends(get_db)):
##    result = repo.get_all_clientes(db)
##    return result


@cliente_api.get('/{cuit}', response_model=ClienteApi)
def get_by_id(cuit: int, db = Depends(get_db)):
    result = repo.get_by_id(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='cliente no encontrada')
    
    return result

@cliente_api.post('', response_model=ClienteApi, status_code=201)
def agregar(datos:ClienteApi, db = Depends(get_db,)):
    try:
        result = repo.agregar(db, datos)
        if result is None:
            raise HTTPException(status_code=404)
    except Exception as e:
        raise HTTPException(status_code=404, detail='no se pudo agregar el cliente, ya existe el cuit')
    return result

@cliente_api.delete('/{cuit}', status_code=204)
def borrar(cuit:int, db = Depends(get_db)):
    try:
        result = repo.borrar(db, cuit)
        if result is None:
            raise HTTPException(status_code=404, detail='cliente no encontrado')
        return result
    except Exception as e:
        raise HTTPException(status_code=401, detail='No se puede eliminar el cliente ya que el mismo posee comprobantes asociados')

@cliente_api.put('/{cuit}', response_model=ClienteApi)
def modificar(cuit:int, datos:ClienteApi, db = Depends(get_db)):
    result = repo.modificar(db, cuit, datos)
    if result is None:
        raise HTTPException(status_code=404, detail='cliente no encontrada')
    return result