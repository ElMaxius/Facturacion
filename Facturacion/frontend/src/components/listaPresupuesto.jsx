import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

const PresupuestoList = () => {
  const [presupuestos, setpresupuestosVenta] = useState([]);
  const navegar = useNavigate()

  useEffect(() => {
    getDatos()
  }, []);

  const getDatos = async () => {
    let resultado = await axios.get('http://localhost:8000/presupuesto')
    console.log(resultado)
    setpresupuestosVenta(resultado.data)
}

const agregarpresupuesto = () => {
    navegar("../presupForm")
    getDatos()
}

  return (
    <div className="mt-3">


      <div className='container-fluid'>

        <Button variant="primary" onClick={agregarpresupuesto}>Cargar presupuesto</Button>

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
                    <Link to={"../verPresupuesto/"+presupuesto.numero} >
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

export default PresupuestoList;