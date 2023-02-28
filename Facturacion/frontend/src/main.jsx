import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FacturaCompraForm from './components/facCompraForm'
import FacVentaFormulario from './components/facVentaForm'
import Comprobantes from './components/comprobantes'
import ListaProductos from './components/listaProductos'
import ListaProveedores from './components/listaProveedores'
import ListaClientes from './components/listaClientes';
import ClienteFormulario from './components/clienteForm'
import VendedorFormulario from './components/vendedorForm'
import ListaVendedores from './components/listaVendedores';
import PresupuestoFormulario from './components/presupForm'
import FacturaCompraList from './components/listaFacturaCompra'
import FacturaVentaList from './components/listaFacturaVenta'
import PresupuestoList from './components/listaPresupuesto'
import ProveedorFormulario from './components/proveedorForm'
import ProductoFormulario from './components/productoForm';
import VerFacturaCompraForm from './components/verFacturaCompra'
import ListaVentasProductos from './components/listaVentasProductos';
import VerFacturaVenta from './components/verFacturaVenta';
import VerPresupuesto from './components/verPresupuesto';

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path="/comprobantes" element={<Comprobantes/>} >      
            <Route path="listaFacturaCompra" element={<FacturaCompraList/>}/>
            <Route path="verFacturaCompra/:id" element={<VerFacturaCompraForm/>} />
            <Route path="facCompraForm/:id" element={<FacturaCompraForm/>} />
            <Route path="listaFacturaVenta" element={<FacturaVentaList/>}/>
            <Route path="facVentaForm" element={<FacVentaFormulario />} />
            <Route path="verFacturaventa/:id" element={<VerFacturaVenta/>} />
            <Route path="listaVentasProductos/:fechaDesde/:fechaHasta" element={<ListaVentasProductos />} />
            <Route path="listaPresupuesto" element={<PresupuestoList/>}/>
            <Route path="presupForm" element={<PresupuestoFormulario/>} />
            <Route path="verPresupuesto/:id" element={<VerPresupuesto/>} />
            <Route path="facVentaForm/:id" element={<FacVentaFormulario />} />
          </Route>
          <Route path="/ListaProductos" element={<ListaProductos/>} />
          <Route path="productoForm/:id" element={<ProductoFormulario/>} />
          <Route path="/ListaProveedores" element={<ListaProveedores/>} />
          <Route path="proveedorForm/:id" element={<ProveedorFormulario/>} />
          <Route path="/ListaClientes" element={<ListaClientes/>} />
          <Route path="/clienteForm/:id" element={<ClienteFormulario/>} />
          <Route path="/ListaVendedores" element={<ListaVendedores/>} />
          <Route path="/vendedorForm/:id" element={<VendedorFormulario/>} />
        </Route>
      </Routes>
    </BrowserRouter>

)
