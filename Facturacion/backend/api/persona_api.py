from fastapi import APIRouter, Depends, HTTPException
from modelos.persona_api import PersonaApi
from repositorios.persona_repo import PersonaRepositorio
from database import get_db


persona_api = APIRouter(prefix='/persona', tags=['Personas'])
repo = PersonaRepositorio()

@persona_api.get('', response_model=list[PersonaApi])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

@persona_api.get('/proveedores', response_model=list[PersonaApi])
def get_all_proveedores(db = Depends(get_db)):
    result = repo.get_all_proveedores(db)
    return result

@persona_api.get('/clientes', response_model=list[PersonaApi])
def get_all_clientes(db = Depends(get_db)):
    result = repo.get_all_clientes(db)
    return result


@persona_api.get('/{cuit}', response_model=PersonaApi)
def get_by_id(cuit: int, db = Depends(get_db)):
    result = repo.get_by_id(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='Persona no encontrada')
    
    return result

@persona_api.post('', response_model=PersonaApi, status_code=201)
def agregar(datos:PersonaApi, db = Depends(get_db,)):
    try:
        result = repo.agregar(db, datos)
        if result is None:
            raise HTTPException(status_code=404)
    except Exception as e:
        raise HTTPException(status_code=404, detail='no se pudo agregar la persona')
    return result

@persona_api.delete('/{cuit}', status_code=204)
def borrar(cuit:int, db = Depends(get_db)):
    result = repo.borrar(db, cuit)
    if result is None:
        raise HTTPException(status_code=404, detail='Persona no encontrado')
    return result

@persona_api.put('/{cuit}', response_model=PersonaApi)
def modificar(cuit:int, datos:PersonaApi, db = Depends(get_db)):
    result = repo.modificar(db, cuit, datos)
    if result is None:
        raise HTTPException(status_code=404, detail='Persona no encontrada')
    return result