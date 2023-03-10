import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function VendedorFormulario() {
    const [cuit, setCuit] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [localidad, setLocalidad] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id == -1) {
            setCuit(-1);
            setNombre('');
            setDireccion('');
            setTelefono('');
            setLocalidad('');
        } else {
            getVendedor(params.id);
        }
    }, [params.id]);
    
    const getVendedor = async (id) => {
        try {
            let response = await axios.get(`http://localhost:8000/vendedor/${params.id}`)
            const prov = response.data;
            setCuit(prov.cuit);
            setNombre(prov.nombre);
            setDireccion(prov.direccion);
            setTelefono(prov.telefono);
            setLocalidad(prov.localidad);
        } catch (e) {
            console.error(e);
            alert('Ha ocurrido un error al obtener el vendedor');
        }
    }

    const grabarVendedor = async () => {
        try {
            if (params.id !== "-1") {
                if (cuit <= 0) {
                    alert('Ingrese un cuit valido');
                } else {
                    await axios.put(`http://localhost:8000/vendedor/${params.id}`, { cuit, nombre, direccion, telefono, localidad }).then(navigate('../listaVendedores'));

                }
            } else {
                if (cuit <= 0) {
                    alert('Ingrese un cuit valido');
                } else {
                    await axios.post(`http://localhost:8000/vendedor`, { cuit, nombre, direccion, telefono, localidad }).then(navigate('../listaVendedores'));

                }
            }
        } catch (e) {
            console.error(e);
            alert('Ha ocurrido un error al grabar el vendedor');
        }
    };

    const handleEdits = (ev) => {
        const { id, value } = ev.target;
        setVendedor(prev => ({ ...prev, [id]: value }));
    };


    return (
        <div className="container-fluid" style={{ width: "50vw" }}>
            <form>
                <h2 className="mt-3 text-center">Datos del Vendedor</h2>
                <div className="mb-3 col-2">
                    <label htmlFor="cuit" className="form-label">CUIT</label>
                    <input type="number" className="form-control" id="cuit" value={cuit} onChange={(e) => setCuit(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <div className="mb-3 col-2">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="number" className="form-control" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                </div>
                <div className="mb-3 col-2">
                    <label htmlFor="localidad" className="form-label">localidad</label>
                    <input type="text" className="form-control" id="localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
                </div>
                <div className="mb-3 text-end">
                    <button className="btn btn-primary me-1" onClick={grabarVendedor}>Aceptar</button>
                    <button className="btn btn-secondary ms-1" onClick={() => navigate('../listaVendedores')}>Cancelar</button>
                </div>
            </form>
        </div>
    );

};
