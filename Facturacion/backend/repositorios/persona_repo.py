from sqlalchemy import select
import sqlalchemy
from sqlalchemy.orm import Session
from modelos.persona_api import PersonaApi
from modelos.persona_bd import PersonaBd
from sqlalchemy.exc import IntegrityError

class PersonaRepositorio():
    def get_all(self, db: Session):
        return db.execute(select(PersonaBd)).scalars().all()
    
    def get_all_proveedores(self, db: Session):
        return db.execute(select(PersonaBd).where(PersonaBd.tipo == 'p' or 'P')).scalars().all()
    
    def get_all_clientes(self, db: Session):
        return db.execute(select(PersonaBd).where(PersonaBd.tipo == 'c' or 'C')).scalars().all()
    
    def get_all_vendedores(self, db: Session):
        return db.execute(select(PersonaBd).where(PersonaBd.tipo == 'v' or 'V')).scalars().all()
    
    def get_by_id(self, db: Session, cuit:int):
        result = db.execute(select(PersonaBd).where(PersonaBd.cuit == cuit)).scalar()
        return result
    
    def agregar(self, db: Session, datos: PersonaApi):
        nueva_Persona_db: PersonaBd = PersonaBd(**datos.dict())
        if((nueva_Persona_db.tipo == "p" or nueva_Persona_db.tipo == "c" or nueva_Persona_db.tipo == "v")
            or(nueva_Persona_db.tipo == "P" or nueva_Persona_db.tipo == "C" or nueva_Persona_db.tipo == "V")):
            db.add(nueva_Persona_db)
            db.commit()
        else:
            return None
        return nueva_Persona_db
    
    def borrar(self, db:Session, cuit:int):
        objeto = self.get_by_id(db, cuit)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto
    
    def modificar(self, db:Session, cuit:int, datos:PersonaApi):
        objeto:PersonaBd = self.get_by_id(db, cuit)
        if objeto is None:
            return None
        else:
            for k, v in datos.dict(exclude_unset=True).items():
                setattr(objeto, k, v)
        db.commit()
        return objeto
    

    