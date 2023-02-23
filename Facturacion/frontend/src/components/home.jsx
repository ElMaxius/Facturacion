import React from "react"
import { Outlet, NavLink } from "react-router-dom";

export default function Home() {
  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid align-items-center p-2">
          <NavLink to="/" className="navbar-brand">Inicio</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item"><NavLink to="comprobantes" className="nav-link">Comprobantes</NavLink></li>
              <li className="nav-item"><NavLink to="listaProductos" className="nav-link">Productos</NavLink></li>
              <li className="nav-item"><NavLink to="listaProveedores" className="nav-link">Proveedores</NavLink></li>
              <li className="nav-item"><NavLink to="listaClientes" className="nav-link">Clientes</NavLink></li>
              <li className="nav-item"><NavLink to="listaVendedores" className="nav-link">Vendedores</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  )
}