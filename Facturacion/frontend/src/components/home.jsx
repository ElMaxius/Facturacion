import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Inicio</a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="/facCompraForm">Facturas de compras</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/facVentaForm">Facturas de ventas</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/presupForm">Presupuestos</a>
              </li> */}
              <li class="nav-item">
                <a class="nav-link" href="/listaProductos">Comprobantes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaProductos">Productos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaProductos">Proveedores</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaProductos">Clientes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaProductos">Vendedores</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}