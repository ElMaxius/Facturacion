from sqlalchemy import select
from sqlalchemy.orm import Session
from modelos.producto_api import ProductoSinCodigo, ProductoApi
from modelos.producto_bd import ProductoBd
from sqlalchemy.exc import IntegrityError

class ProductoRepositorio():
    def get_all(self, db: Session):
        return db.execute(select(ProductoBd)).scalars().all()
    
    def get_by_id(self, db: Session, codigo:int):
        result = db.execute(select(ProductoBd).where(ProductoBd.codigo == codigo)).scalar()
        return result
    
    def agregar(self, db: Session, datos: ProductoSinCodigo):
        nuevo_Producto_db: ProductoBd = ProductoBd(**datos.dict())
        try:
            db.add(nuevo_Producto_db)
            db.commit()
        except  IntegrityError as e:
            raise RuntimeError("No se ha podido agregar el producto".format(e))
        return nuevo_Producto_db
    
    def borrar(self, db:Session, codigo:int):
        objeto = self.get_by_id(db, codigo)
        if objeto is None:
            return None          
        db.delete(objeto)
        db.commit()
        return objeto
    

    

