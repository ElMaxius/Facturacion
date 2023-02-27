import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from 'date-fns';

const FacturaVentaList = () => {
  const [facturas, setFacturasVenta] = useState([]);
  const [mostrarInputs, setMostrarInputs] = useState(false);
  const [fechaDesde, setFechaDesde] = useState(null)
  const [fechaHasta, setFechaHasta] = useState(null)
  const navegar = useNavigate()

  useEffect(() => {
    getDatos()
  }, []);


  const handleFechaDesdeChange = (date) => {
    setFechaDesde(format(parseISO(date.toISOString()), "yyyy-MM-dd"));
    console.log(fechaDesde)
  };

  const handleFechaHastaChange = (date) => {
    setFechaHasta(format(parseISO(date.toISOString()), "yyyy-MM-dd"));
    console.log(fechaHasta)
  };

  const botonMostrarInputs = () => {
    setMostrarInputs(!mostrarInputs);
  };

  const getDatos = async () => {
    let resultado = await axios.get('http://localhost:8000/facturaVentas')
    console.log(resultado)
    setFacturasVenta(resultado.data)
  }

  const agregarFactura = () => {
    navegar("../facVentaForm")
  }

  const consultarVentas = () => {
    if (fechaDesde && fechaHasta) {
      navegar(`../listaVentasProductos/${fechaDesde}/${fechaHasta}`)
    } else {
      alert('Debe seleccionar un rango de fechas')
    }
  }
  const consultarFacturas = async () => {
    if (fechaDesde && fechaHasta) {
      let resultado = await axios.get(`http://localhost:8000/facturaVentas/${fechaDesde}/${fechaHasta}`)
      console.log(resultado)
      setFacturasVenta(resultado.data)
    } else {
      alert('Debe seleccionar un rango de fechas')
    }

  }

  return (
    <div className="container-fluid mt-3">
      <div className="row d-flex align-items-center">
        <div className="col-4">
          <Button variant="primary mb-3" onClick={agregarFactura}>
            Cargar factura
          </Button>{" "}
          <Button variant="primary mb-3" onClick={botonMostrarInputs}>
            Consultas
          </Button>{" "}
        </div>
        {mostrarInputs && (

          <div className="form-inline border border-secondary">
            <Button variant="success" className='mt-2' onClick={consultarVentas}>
              Consultar ventas del periodo
            </Button>{' '}
            <Button variant="success" className='mt-2' onClick={consultarFacturas}>
              Consultar facturas del periodo
            </Button>{' '}
            <Button variant="success" className='mt-2' onClick={getDatos}>
              Limpiar Filtro
            </Button>
            <div className="col-6">
              <label htmlFor="desde" className="mr-2">
                fecha desde:
              </label>
              <div className="col-sm-4">
                <DatePicker
                  id="fechaDesde"
                  selected={fechaDesde ? parseISO(fechaDesde) : null}
                  dateFormat="yyyy-MM-dd"
                  onChange={handleFechaDesdeChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="hasta" className="mr-2">
                fecha hasta:
              </label>
              <div className="col-sm-4 mb-2">
                <DatePicker
                  id="fechaHasta"
                  selected={fechaHasta ? parseISO(fechaHasta) : null}
                  dateFormat="yyyy-MM-dd"
                  onChange={handleFechaHastaChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <Table className="mt-3" striped bordered hover>
        <thead>
          <tr>
            <th>Número</th>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>CUIT Vendedor</th>
            <th>CUIT Cliente</th>
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
              <td>{factura.vendedor.cuit}</td>
              <td>{factura.cliente.cuit}</td>
              <td>{factura.total_general}</td>
              <td>
                <Link to="" >
                  <Button variant="primary">Ver</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>

  );
};

export default FacturaVentaList;