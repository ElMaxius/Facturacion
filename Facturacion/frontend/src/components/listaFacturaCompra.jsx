import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const FacturaCompraList = () => {
  const [facturas, setFacturasCompra] = useState([]);
  const navegar = useNavigate()

  useEffect(() => {
    getDatos()
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get('http://localhost:8000/facturaCompras')
    console.log(resultado)
    setFacturasCompra(resultado.data)
}

const agregarFactura = () => {
    navegar("../facCompraForm")
}

  return (
    <div className="mt-3">


      <div className='container-fluid'>

        <Button variant="primary" onClick={agregarFactura}>Cargar factura</Button>

        <Table className="mt-3" striped bordered hover>
            <thead>
            <tr>
                <th>Número</th>
                <th>Fecha</th>
                <th>Tipo</th>
                <th>CUIT Proveedor</th>
                <th>Total Factura</th>
                <th></th>
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
                    <Link to={"../verFacturaCompraA/"+factura.numero} >
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