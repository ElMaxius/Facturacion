from sqlalchemy import select
import sqlalchemy
from sqlalchemy.orm import Session
from modelos.vendedor_api import VendedorApi
from modelos.vendedor_bd import VendedorBd
from sqlalchemy.exc import IntegrityError

class VendedorRepositorio():
    def get_all(self, db: Session):
        return db.execute(select(VendedorBd)).scalars().all()

    
    def get_by_id(self, db: Session, cuit:int):
        result = db.execute(select(VendedorBd).where(VendedorBd.cuit == cuit)).scalar()
        return result
    
    def agregar(self, db: Session, datos: VendedorApi):
        nuevo_vendedor_db: VendedorBd = VendedorBd(**datos.dict())
        db.add(nuevo_vendedor_db)
        db.commit()

        return nuevo_vendedor_db
    
    def borrar(self, db:Session, cuit:int):
        objeto = self.get_by_id(db, cuit)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto
    
    def modificar(self, db:Session, cuit:int, datos:VendedorApi):
        objeto:VendedorBd = self.get_by_id(db, cuit)
        if objeto is None:
            return None
        else:
            for k, v in datos.dict(exclude_unset=True).items():
                setattr(objeto, k, v)
        db.commit()
        return objeto
    

    