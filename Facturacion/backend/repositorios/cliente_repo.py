from sqlalchemy import select
import sqlalchemy
from sqlalchemy.orm import Session
from modelos.cliente_api import ClienteApi
from modelos.cliente_bd import ClienteBd
from sqlalchemy.exc import IntegrityError

class ClienteRepositorio():
    def get_all(self, db: Session):
        return db.execute(select(ClienteBd)).scalars().all()
    
    
    # def get_all_clientes(self, db: Session):
    #     return db.execute(select(ClienteBd)).scalars().all()
    
    
    def get_by_id(self, db: Session, cuit:int):
        result = db.execute(select(ClienteBd).where(ClienteBd.cuit == cuit)).scalar()
        return result
    
    def agregar(self, db: Session, datos: ClienteApi):
        nueva_Cliente_db: ClienteBd = ClienteBd(**datos.dict())
        db.add(nueva_Cliente_db)
        db.commit()
        return nueva_Cliente_db
    
    def borrar(self, db:Session, cuit:int):
        objeto = self.get_by_id(db, cuit)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto
    
    def modificar(self, db:Session, cuit:int, datos:ClienteApi):
        objeto:ClienteBd = self.get_by_id(db, cuit)
        if objeto is None:
            return None
        else:
            for k, v in datos.dict(exclude_unset=True).items():
                setattr(objeto, k, v)
        db.commit()
        return objeto
    

    