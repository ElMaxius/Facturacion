from sqlalchemy import select
import sqlalchemy
from sqlalchemy.orm import Session
from modelos.vendedor_api import ProveedorApi
from modelos.vendedor_bd import ProveedorBd
from sqlalchemy.exc import IntegrityError

class ProveedorRepositorio():
    def get_all(self, db: Session):
        return db.execute(select(ProveedorBd)).scalars().all()

    
    def get_by_id(self, db: Session, cuit:int):
        result = db.execute(select(ProveedorBd).where(ProveedorBd.cuit == cuit)).scalar()
        return result
    
    def agregar(self, db: Session, datos: ProveedorApi):
        nuevo_proveedor_bd: ProveedorBd = ProveedorBd(**datos.dict())
        db.add(nuevo_proveedor_bd)
        db.commit()

        return nuevo_proveedor_bd
    
    def borrar(self, db:Session, cuit:int):
        objeto = self.get_by_id(db, cuit)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto
    
    def modificar(self, db:Session, cuit:int, datos:ProveedorApi):
        objeto:ProveedorBd = self.get_by_id(db, cuit)
        if objeto is None:
            return None
        else:
            for k, v in datos.dict(exclude_unset=True).items():
                setattr(objeto, k, v)
        db.commit()
        return objeto
    

    