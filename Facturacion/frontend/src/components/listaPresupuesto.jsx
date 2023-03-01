import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parseISO } from "date-fns";

const PresupuestoList = () => {
  const [presupuestos, setpresupuestosVenta] = useState([]);
  const [mostrarInputs, setMostrarInputs] = useState(false);
  const [fechaDesde, setFechaDesde] = useState(null)
  const [fechaHasta, setFechaHasta] = useState(null)
  const navegar = useNavigate()

  useEffect(() => {
    getDatos()
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get('http://localhost:8000/presupuesto')
    console.log(resultado)
    setpresupuestosVenta(resultado.data)
  }

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

  const consultarFacturas = async () => {
    if (fechaDesde && fechaHasta) {
      let resultado = await axios.get(`http://localhost:8000/presupuesto/${fechaDesde}/${fechaHasta}`)
      console.log(resultado)
      setpresupuestosVenta(resultado.data)
    } else {
      alert('Debe seleccionar un rango de fechas')
    }
  }

  const agregarpresupuesto = () => {
    navegar("../presupForm")
    getDatos()
  }
  const generarFactura = (numero) => {
    navegar("../facVentaForm/" + numero)
    getDatos()
  }


  return (
    <div className="mt-3">


      <div className='container-fluid'>


      <div className="row d-flex align-items-center">
        <div className="col-4">
          <Button variant="primary mb-3" onClick={agregarpresupuesto}>
            Cargar presupuesto
          </Button>{" "}
          <Button variant="primary mb-3" onClick={botonMostrarInputs}>
            Consultas
          </Button>{" "}
        </div>
        {mostrarInputs && (
          <div className="form-inline border border-secondary">
            <div className="row">
              <div className="col-3 mb-3 mt-2">
                <label htmlFor="desde" className="mr-2">
                  fecha desde:
                </label>
                <div className="form-group">
                  <DatePicker
                    id="fechaDesde"
                    selected={fechaDesde ? parseISO(fechaDesde) : null}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleFechaDesdeChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-3 mb-3 mt-2">
                <label htmlFor="hasta" className="mr-2">
                  fecha hasta:
                </label>
                <div className="form-group">
                  <DatePicker
                    id="fechaHasta"
                    selected={fechaHasta ? parseISO(fechaHasta) : null}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleFechaHastaChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-6 mt-4">
                <Button variant="success" className='mt-2 mb-2' onClick={consultarFacturas}>
                  Consultar Presupuestos del periodo
                </Button>{' '}
                <Button variant="success" className='mt-2 mb-2' onClick={getDatos}>
                  Limpiar Filtro
                </Button>
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
            <th>Total presupuesto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {presupuestos.map((presupuesto) => (
            <tr key={presupuesto.numero}>
              <td>{presupuesto.numero}</td>
              <td>{presupuesto.fecha_de_ingreso}</td>
              <td>{presupuesto.tipo_comprobante}</td>
              <td>{presupuesto.vendedor.cuit}</td>
              <td>{presupuesto.cliente.cuit}</td>
              <td>{(presupuesto.total_general).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
              <td>
                <Link to={"../verPresupuesto/" + presupuesto.numero} >
                  <Button variant="primary">Ver</Button>{"  "}
                </Link>
                <Button variant="success" onClick={() => generarFactura(presupuesto.numero)}>Generar Factura</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div >
  );
};

export default PresupuestoList;