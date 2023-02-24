import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const navegar = useNavigate()
  
    useEffect(() => {
      getDatos()
    }, []);
  
    const getDatos = async () => {
      let resultado = await axios.get('http://localhost:8000/productos')
      console.log(resultado)
      setProductos(resultado.data)
  }
  
  const agregarproducto = () => {
      navegar("../productoForm")
  }
  
    return (
      <div className="mt-3">
  
  
        <div className='container-fluid'>
  
          <Button variant="primary" onClick={agregarproducto}>Cargar producto</Button>
  
          <Table className="mt-3" striped bordered hover>
              <thead>
              <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>IVA</th>
                  <th>Precio</th>
                  <th></th>
              </tr>
              </thead>
              <tbody>
              {productos.map((producto) => (
                  <tr key={producto.codigo}>
                  <td>{producto.codigo}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.alicuotaIVA}</td>
                  <td>{producto.precio}</td>
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