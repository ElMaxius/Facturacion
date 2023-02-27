import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const ListaVentasProductos = () => {
  const [ventas, setVentas] = useState([]);
  const navegar = useNavigate()
  const params = useParams();

  const fechaDesde = params.fechaDesde;
  const fechaHasta = params.fechaHasta;

  useEffect(() => {
    getDatos()
    console.log(fechaDesde)
    console.log(fechaHasta)
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get(`http://localhost:8000/itemFacturaVentas/${fechaDesde}/${fechaHasta}`).then(data => data.data)
    console.log(resultado)
    setVentas(resultado)
  }


  return (
    <div className="mt-3">


      <div className='container-fluid'>
        <Table className="mt-3" striped bordered hover>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Codigo</th>
              <th>Descripcion</th>
              <th>Cantidad Vendida</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map((venta, index) => (
              <tr key={index}>
                <td>{venta.facturaVentas.fecha}</td>
                <td>{venta.producto.codigo}</td>
                <td>{venta.producto.nombre}</td>
                <td>{venta.cantidad}</td>
                <td>{venta.subtotal}</td>

              </tr>
            ))}
          </tbody>
        </Table>
        <div className="mb-3 text-end">
          <Button className="btn btn-primary ms-2" onClick={() => navegar(-1)}>Volver</Button>{" "}
        </div>
      </div>
    </div>
  );
};

export default ListaVentasProductos;