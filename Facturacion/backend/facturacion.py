import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.producto_api import producto_api
from api.cliente_api import cliente_api
from api.presupuesto_api import presupuesto_api
from api.vendedor_api import vendedor_api
from api.proveedor_api import proveedor_api

import database


database.create_all()

app = FastAPI()
app.include_router(producto_api)
app.include_router(cliente_api)
app.include_router(vendedor_api)
app.include_router(proveedor_api)
app.include_router(presupuesto_api)



app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if __name__ == '__main__':
    uvicorn.run('facturacion:app', host='127.0.0.1', port=8000, reload=True)
