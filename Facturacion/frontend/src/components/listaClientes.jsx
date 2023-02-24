import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaClientes() {
    const [Cliente, setClientes] = useState([]);
    const navegar = useNavigate()
  
    useEffect(() => {
      getDatos()
    }, []);
  
    const getDatos = async () => {
      let resultado = await axios.get('http://localhost:8000/cliente')
      console.log(resultado)
      setClientes(resultado.data)
  }
  
  const agregarCliente = () => {
      navegar("../clienteForm")
  }
  
    return (
      <div className="mt-3">
  
  
        <div className='container-fluid'>
  
          <Button variant="primary" onClick={agregarCliente}>Cargar cliente</Button>
  
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
              {Cliente.map((cliente) => (
                  <tr key={cliente.cuit}>
                  <td>{cliente.cuit}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.localidad}</td>
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