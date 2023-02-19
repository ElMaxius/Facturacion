from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.persona_api import PersonaApi
from modelos.persona_bd import PersonaBd
from sqlalchemy.exc import IntegrityError

class PersonaRepositorio():
    def get_all(self, db: Session):
        return db.execute(select(PersonaBd)).scalars().all()
    
    def get_all_proveedores(self, db: Session):
        return db.execute(select(PersonaBd).where(PersonaBd.tipo == 'p')).scalars().all()
    
    def get_all_clientes(self, db: Session):
        return db.execute(select(PersonaBd).where(PersonaBd.tipo == 'c')).scalars().all()
    
    def get_by_id(self, db: Session, cuit:int):
        result = db.execute(select(PersonaBd).where(PersonaBd.cuit == cuit)).scalar()
        return result
    
    def agregar(self, db: Session, datos: PersonaApi):
        nueva_Persona_db: PersonaBd = PersonaBd(**datos.dict())
        try:
            if(nueva_Persona_db.tipo == "p" or nueva_Persona_db.tipo == "c"):
                db.add(nueva_Persona_db)
                db.commit()
            else:
                return None
            
        except  IntegrityError as e:
            raise RuntimeError("No se ha podido agregar el la persona".format(e))
        return nueva_Persona_db
    
    def borrar(self, db:Session, cuit:int):
        objeto = self.get_by_id(db, cuit)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto
    

    