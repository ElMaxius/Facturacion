import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function VerPresupuesto() {
    const [presupuesto, setPresupuesto] = useState({
        numero: 0,
        fecha_de_ingreso: '',
        valido_hasta: "",
        tipo_comprobante: "",
        vendedor: {
            cuit: 0,
            nombre: "",
            direccion: "",
            telefono: "",
            localidad: ""
        },
        cliente: {
            cuit: 0,
            nombre: "",
            direccion: "",
            telefono: "",
            localidad: ""
        },
        total_general: 0.00
    });
    const [subtotal, setSubtotal] = useState(0)
    const [iva21, setIva21] = useState(0)
    const [iva105, setIva105] = useState(0)
    const [ivaAcumulado, setIva] = useState(0)
    const [items, setItems] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        obtenerDatosPresupuesto();
    }, []);

    useEffect(() => {
        obtenerItems();
    }, [presupuesto.numero]);

    useEffect(() => {
        calcular(items);
    }, [items.length]);


    const calcular = (i) => {
        let subtotal = 0;
        let iva21 = 0;
        let iva105 = 0;
        let ivaAcumulado = 0;
        console.log("calcular", i)
        try {
            i.forEach((item) => {
                subtotal += item.producto.precio * item.cantidad;
                if (item.producto.alicuotaIVA == 0.105) {
                    iva105 += item.producto.alicuotaIVA * (item.cantidad * item.producto.precio);
                }
                else if (item.producto.alicuotaIVA == 0.21) {
                    iva21 += item.producto.alicuotaIVA * (item.cantidad * item.producto.precio);
                }
            });
        } catch (e) {
            console.error(e.message);
        }
        ivaAcumulado = iva21 + iva105;
        setSubtotal(subtotal);
        setIva(ivaAcumulado);
        setIva21(iva21);
        setIva105(iva105);
    };


    const obtenerDatosPresupuesto = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/presupuesto/${params.id}`).then(data => data.data)
            setPresupuesto(resultado)

        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al obtener los datos del Presupuesto');
        }
    }
    const obtenerItems = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/itemPresupuestos/${params.id}`).then(data => data.data)
            setItems(resultado)
            //calcular(resultado)
        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al obtener los items de la presupuesto' + e.message);
        }

    }


    return (
        <div className="container">
            <h2 className="mt-4 mb-4 text-center">
                <label htmlFor="tipo_comprobante">Presupuesto: {presupuesto.tipo_comprobante}</label>
            </h2>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label ms-auto" htmlFor='numero'>presupuesto Nro{" "}{presupuesto.numero}</label>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label ms-auto" id="fecha">Fecha de emisión:{" "}{presupuesto.fecha_de_ingreso}</label>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label ms-auto" id="fecha">Valido hasta:{" "}{presupuesto.valido_hasta}</label>
            </div>
            <div className='row'>
                <div className="col-6 border border-secondary">
                    <div className="form-group row mt-4 h5">
                        <label className="col-sm-12 col-form-label">
                            Datos del Vendedor:
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor='cuit_vendedor'>CUIT: {presupuesto.vendedor.cuit}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Nombre: {presupuesto.vendedor.nombre}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Dirección: {presupuesto.vendedor.direccion}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Telefono: {presupuesto.vendedor.telefono}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Localidad: {presupuesto.vendedor.localidad}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                </div>
                <div className="col-6 border border-secondary">
                    <div className="form-group row mt-4 h5">
                        <label className="col-sm-12 col-form-label">
                            Datos del Cliente:
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor='cuit_cliente'>CUIT: {presupuesto.cliente.cuit}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Razon social: {presupuesto.cliente.nombre}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Dirección: {presupuesto.cliente.direccion}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Telefono: {presupuesto.cliente.telefono}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Localidad: {presupuesto.cliente.localidad}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                </div>
            </div>
            <Table className="mt-3" striped bordered hover>
                <thead>
                    <tr>
                        <th>Cantidad</th>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>PU</th>
                        <th>IVA</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.cantidad}</td>
                                <td>{item.codigo_producto}</td>
                                <td>{item.producto.nombre}</td>
                                <td>{(item.producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                <td>{item.producto.alicuotaIVA}</td>
                                <td>{(item.subtotal).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <br />
            <br />
            {presupuesto.tipo_comprobante == "A" && (
                <>
                    <div className='row justify-content-end'>
                        <label className="mb-3 w-25">
                            Subtotal:
                            <input className="form-control ms-auto" type="text" value={subtotal.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                    </div>
                    <div className='row justify-content-end'>
                        <br />
                        <label className="mb-3 col-3">
                            IVA 10.5:
                            <input className="form-control" type="text" value={iva105.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                        <br />
                        <label className="mb-3 col-3">
                            IVA 21:
                            <input className="form-control" type="text" value={iva21.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                        <br />
                        <label className="mb-3 col-3">
                            Subtotal IVA:
                            <input className="form-control" type="text" value={ivaAcumulado.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                        <label className="mb-3 col-3">
                            Total:
                            <input className="form-control" type="text" value={(subtotal + ivaAcumulado).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                    </div>
                </>
            ) || (

                    <div className='row justify-content-end'>
                        <br />
                        <label className="mb-3 col-3">
                            Total:
                            <input className="form-control" type="text" value={(subtotal + ivaAcumulado).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                    </div>
                )}
            <div className="mb-3 text-end">
                <Button className="btn btn-primary ms-1" onClick={() => navigate(-1)}>Volver</Button>
            </div>
        </div>
    );
}

export default VerPresupuesto;