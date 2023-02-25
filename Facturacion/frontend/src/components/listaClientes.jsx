import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaClientes() {
    const [clientes, setclientes] = useState([]);
    const navegar = useNavigate()

    useEffect(() => {
        getDatos()
    }, []);

    const getDatos = async () => {
        let resultado = await axios.get('http://localhost:8000/cliente')
        console.log(resultado)
        setclientes(resultado.data)
    }

    const agregarcliente = () => {
        navegar("../clienteForm/"+-1)
    }

    const borrar = async (cuit) =>{
        try{
            let response= await axios.delete(`http://localhost:8000/cliente/${cuit}`)
        }catch(e){
            alert(e)
        }
        getDatos();
    }

    return (
        <div className="mt-3">


            <div className='container'>

                <Button variant="primary" onClick={agregarcliente}>Cargar cliente</Button>

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
                        {clientes.map((cliente) => (
                            <tr key={cliente.cuit}>
                                <td>{cliente.cuit}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.localidad}</td>
                                <td>
                                    <Link to={"../clienteForm/"+cliente.cuit}><Button variant="primary">Editar</Button></Link>{' '}
                                    <Button variant="danger" onClick={()=>borrar(cliente.cuit)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}