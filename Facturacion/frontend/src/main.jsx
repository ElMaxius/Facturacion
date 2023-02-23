import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FacCompraFormulario from './components/facCompraForm'
import FacVentaFormulario from './components/facVentaForm'
import Comprobantes from './components/comprobantes'
import ListaProductos from './components/listaProductos'
import ListaProveedores from './components/listaProveedores'
import ListaClientes from './components/listaClientes';
import ListaVendedores from './components/listaVendedores';
import PresupuestoFormulario from './components/presupForm'
import FacturaCompraList from './components/listaFacturaCompra'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path="/comprobantes" element={<Comprobantes/>} >      
              <Route path="facCompraForm" element={<FacCompraFormulario />} />
              <Route path="listaFacturaCompra" element={<FacturaCompraList/>}/>
            <Route path="facVentaForm" element={<FacVentaFormulario />} />
            <Route path="presupForm" element={<PresupuestoFormulario/>} />
          </Route>
          <Route path="/ListaProductos" element={<ListaProductos/>} />
          <Route path="/ListaProveedores" element={<ListaProveedores/>} />
          <Route path="/ListaClientes" element={<ListaClientes/>} />
          <Route path="/ListaVendedores" element={<ListaVendedores/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
