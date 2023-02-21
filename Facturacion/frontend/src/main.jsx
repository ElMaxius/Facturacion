import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './components/home';
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { FacCompraFormulario } from './components/facCompraForm'
import { FacVentaFormulario } from './components/facVentaForm'
import {ListaComprobantes} from './components/listaComprobantes'
import {ListaProductos} from './components/listaProductos'
import {PresupuestoFormulario} from './components/presupForm'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <h1 style={{ textAlign: 'center' }}>Final Laboratorio IV</h1>
    <Routes>
      <Route path='/' element={<Home />} >
        <Route path="/facCompraForm" element={<FacCompraFormulario />} />
        <Route path="/facVentaForm" element={<FacVentaFormulario />} />
        <Route path="/listaComprobantes" element={<ListaComprobantes/>} />
        <Route path="/ListaProductos" element={<ListaProductos/>} />
        <Route path="/presupForm" element={<PresupuestoFormulario/>} />
      </Route>
    </Routes>
  </BrowserRouter>
)
