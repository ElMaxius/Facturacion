from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from modelos.producto_api import ProductoApi, ProductoSinCodigo
from repositorios.producto_repo import ProductoRepositorio


producto_api = APIRouter(prefix='/productos', tags=['Productos'])
repo = ProductoRepositorio()

@producto_api.get('', response_model=list[ProductoApi])
def get_all(db = Depends(get_db)):
    result = repo.get_all(db)
    return result

@producto_api.get('/{codigo}', response_model=ProductoApi)
def get_by_id(codigo: int, db = Depends(get_db)):
    result = repo.get_by_id(db, codigo)
    if result is None:
        raise HTTPException(status_code=404, detail='Producto no encontrado')
   
    return result

@producto_api.post('', response_model=ProductoApi, status_code=201)
def agregar(datos:ProductoSinCodigo, db = Depends(get_db,)):
    try:
        result = repo.agregar(db, datos)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return result

@producto_api.delete('/{codigo}', status_code=204)
def borrar(codigo:int, db = Depends(get_db)):
    result = repo.borrar(db, codigo)
    if result is None:
        raise HTTPException(status_code=404, detail='Producto no encontrado')
    return result


