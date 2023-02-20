from pydantic import BaseModel


class VendedorApi(BaseModel):
    cuit: int
    nombre: str
    direccion: str
    telefono: str
    localidad: str
    tipo: str

    class Config:
        orm_mode = True


