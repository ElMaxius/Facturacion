import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaVendedores() {
    const [vendedor, setVendedores] = useState([]);
    const navegar = useNavigate()
  
    useEffect(() => {
      getDatos()
    }, []);
  
    const getDatos = async () => {
      let resultado = await axios.get('http://localhost:8000/vendedor')
      console.log(resultado)
      setVendedores(resultado.data)
  }
  
  const agregarVendedor = () => {
      navegar("../vendedorForm")
  }
  
    return (
      <div className="mt-3">
  
  
        <div className='container'>
  
          <Button variant="primary" onClick={agregarVendedor}>Cargar vendedor</Button>
  
          <Table className="mt-3" striped bordered hover>
              <thead>
              <tr>
                  <th>CUIT</th>
                  <th>Nombre</th>
                  <th>Direccion</th>
                  <th>Telefono</th>
                  <th>Localidad</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              {vendedor.map((vendedor) => (
                  <tr key={vendedor.cuit}>
                  <td>{vendedor.cuit}</td>
                  <td>{vendedor.nombre}</td>
                  <td>{vendedor.direccion}</td>
                  <td>{vendedor.telefono}</td>
                  <td>{vendedor.localidad}</td>
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
      </div>
    );

}