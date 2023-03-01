import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaProductos() {
    const [productos, setProductos] = useState([]);
    const navegar = useNavigate()

    useEffect(() => {
        getDatos()
    }, [productos.length]);

    const getDatos = async () => {
        let resultado = await axios.get('http://localhost:8000/productos')
        setProductos(resultado.data)
    }

    const agregarproducto = () => {
        navegar("../productoForm/" + -1)
    }

    const borrar = async (codigo) => {
        try {
            let response = await axios.delete(`http://localhost:8000/productos/${codigo}`)
        } catch (error) {
            alert(error.response.data.detail)
        }
        getDatos();
    }

    return (
        <div className="mt-3">


            <div className='container' >

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
                                <td>{(producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                <td>
                                    <Link to={"../productoForm/" + producto.codigo}><Button variant="primary">Editar</Button></Link>{' '}
                                    <Button variant="danger" onClick={() => borrar(producto.codigo)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}