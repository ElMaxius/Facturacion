import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export default function ProductoFormulario() {
    const [codigo, setCodigo] = useState('');
    const [nombre, setNombre] = useState('');
    const [alicuotaIVA, setIva] = useState('');
    const [precio, setPrecio] = useState('');
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if (params.id == -1) {
            //setCodigo();
            setNombre('');
            setIva(0.21);
            setPrecio('');
        } else {
            getProducto(params.id);
        }
    }, []);

    const getProducto = async (id) => {
        try {
            let response = await axios.get(`http://localhost:8000/productos/${params.id}`)
            console.log(response.data)
            const producto = response.data;
            setNombre(producto.nombre);
            setIva(producto.alicuotaIVA);
            setPrecio(producto.precio);
            setCodigo(producto.codigo);
        } catch (e) {
            console.error(e);
            alert('Ha ocurrido un error al obtener el producto');
        }
    }

    const grabarProducto = async () => {
        try {
            if (params.id !== "-1") {
                console.log({ nombre, alicuotaIVA, precio, codigo })
                await axios.put(`http://localhost:8000/productos/${params.id}`, { nombre, alicuotaIVA, precio, codigo}).then(navigate('../listaProductos'));
            } else {
                await axios.post(`http://localhost:8000/productos`, { nombre, alicuotaIVA, precio }).then(navigate('../listaProductos'));
            }
        } catch (e) {
            console.error(e);
            alert('Ha ocurrido un error al grabar el producto');
        }
    };

    // const handleEdits = (ev) => {
    //     const { id, value } = ev.target;
    //     setProveedor(prev => ({ ...prev, [id]: value }));
    // };


    return (
        <div className="container-fluid" style={{ width: "50vw" }}>
            <form>
                <h2 className="mt-3 text-center">Detalle del Producto</h2>
                <div className="mb-3 col-2">
                    <label htmlFor="codigo" className="form-label">Codigo</label>
                    <input type="number" className="form-control" id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} disabled />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="iva" className="form-label">IVA</label>
                    <select
                        className="form-select"
                        aria-label="Tipo de factura"
                        onChange={(e) => setIva(e.target.value)}
                        selected={"0.21"}
                        >
                        <option value="0.21">21%</option>
                        <option value="0.105">10.5%</option>
                    </select>
                </div>
                <div className="mb-3 col-2">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input type="number" className="form-control" id="precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
                </div>
                <div className="mb-3 text-end">
                    <button className="btn btn-primary me-1" onClick={grabarProducto}>Aceptar</button>
                    <button className="btn btn-secondary ms-1" onClick={() => navigate('../listaProductos')}>Cancelar</button>
                </div>
            </form>
        </div>
    );

};
