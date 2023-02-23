import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function Comprobantes() {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid align-items-center p-1">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink to="listaFacturaCompra" className="nav-link">Facturas de compras</NavLink></li>
                            <li className="nav-item"><NavLink to="facVentaForm" className="nav-link">Facturas de ventas</NavLink></li>
                            <li className="nav-item"><NavLink to="presupForm" className="nav-link">Presupuestos</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

