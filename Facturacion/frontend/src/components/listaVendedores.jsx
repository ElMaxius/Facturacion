import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';

export default function ListaVendedores() {
    const [vendedores, setvendedores] = useState([]);
    const navegar = useNavigate()

    useEffect(() => {
        getDatos()
    }, []);

    const getDatos = async () => {
        let resultado = await axios.get('http://localhost:8000/vendedor')
        console.log(resultado)
        setvendedores(resultado.data)
    }

    const agregarvendedor = () => {
        navegar("../vendedorForm/"+-1)
    }

    const borrar = async (cuit) =>{
        try{
            let response= await axios.delete(`http://localhost:8000/vendedor/${cuit}`)
        }catch(e){
            alert(e)
        }
        getDatos();
    }

    return (
        <div className="mt-3">


            <div className='container'>

                <Button variant="primary" onClick={agregarvendedor}>Cargar vendedor</Button>

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
                        {vendedores.map((vendedor) => (
                            <tr key={vendedor.cuit}>
                                <td>{vendedor.cuit}</td>
                                <td>{vendedor.nombre}</td>
                                <td>{vendedor.direccion}</td>
                                <td>{vendedor.telefono}</td>
                                <td>{vendedor.localidad}</td>
                                <td>
                                    <Link to={"../vendedorForm/"+vendedor.cuit}><Button variant="primary">Editar</Button></Link>{' '}
                                    <Button variant="danger" onClick={()=>borrar(vendedor.cuit)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );

}