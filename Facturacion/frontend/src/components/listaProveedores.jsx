import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaProveedores() {
    const [proveedores, setproveedores] = useState([]);
    const navegar = useNavigate()

    useEffect(() => {
        getDatos()
    }, []);

    const getDatos = async () => {
        let resultado = await axios.get('http://localhost:8000/proveedor')
        console.log(resultado)
        setproveedores(resultado.data)
    }

    const agregarproveedor = () => {
        navegar("../proveedorForm/"+-1)
    }

    const borrar = async (cuit) =>{
        try{
            let response= await axios.delete(`http://localhost:8000/proveedor/${cuit}`)
        }catch(e){
            alert(e)
        }
        getDatos();
    }

    return (
        <div className="mt-3">


            <div className='container-fluid'>

                <Button variant="primary" onClick={agregarproveedor}>Cargar proveedor</Button>

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
                        {proveedores.map((proveedor) => (
                            <tr key={proveedor.cuit}>
                                <td>{proveedor.cuit}</td>
                                <td>{proveedor.nombre}</td>
                                <td>{proveedor.direccion}</td>
                                <td>{proveedor.telefono}</td>
                                <td>{proveedor.localidad}</td>
                                <td>
                                    <Link to={"../proveedorForm/"+proveedor.cuit}><Button variant="primary">Editar</Button></Link>{' '}
                                    <Button variant="danger" onClick={()=>borrar(proveedor.cuit)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}