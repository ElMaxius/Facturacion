import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const FacturaCompraList = () => {
  const [facturas, setFacturasCompra] = useState([]);

  useEffect(() => {
    getDatos()
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get('http://localhost:8000/facturaCompras')
    console.log(resultado)
    setFacturasCompra(resultado.data)
}

  return (
    <div className="mt-3">


      <div className='container-fluid'>
        <Link to="" >
            <Button variant="primary">Cargar factura</Button>
        </Link>
        <Table className="mt-3" striped bordered hover>
            <thead>
            <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>CUIT Proveedor</th>
                <th>Total Factura</th>
            </tr>
            </thead>
            <tbody>
            {facturas.map((factura) => (
                <tr key={factura.numero}>
                <td>{factura.numero}</td>
                <td>{factura.fecha}</td>
                <td>{factura.tipo_comprobante}</td>
                <td>{factura.proveedor.cuit}</td>
                <td>{factura.total_general}</td>
                <td>        
                    <Link to="/facturas-compra/nueva" >
                    <Button variant="primary">Ver</Button>
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
      </div>
    </div>
  );
};

export default FacturaCompraList;