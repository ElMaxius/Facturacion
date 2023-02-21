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
              <li class="nav-item">
                <a class="nav-link" href="/facCompraForm">Factura compra</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/facVentaForm">Factura venta</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaComprobantes">Lista comprobantes</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/listaProductos">Lista productos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/presupForm">Presupuesto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}