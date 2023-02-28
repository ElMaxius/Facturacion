import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

function FacturaAForm() {
    const [factura, setFacturaCompra] = useState({
        numero: 0,
        fecha: "",
        tipo_comprobante: "",
        proveedor: {
            cuit: 0,
            nombre: "",
            direccion: "",
            telefono: "",
            localidad: ""
        },
        total_general: 0.0
    });
    const [subtotal, setSubtotal] = useState(0)
    const [iva21, setIva21] = useState(0)
    const [iva105, setIva105] = useState(0)
    const [ivaAcumulado, setIva] = useState(0)
    const [items, setItems] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        obtenerDatosFactura();
        obtenerItems();
        //calcular();
    }, []);


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


    const obtenerDatosFactura = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/facturaCompras/${params.id}`).then(data => data.data)
            setFacturaCompra(resultado)

        } catch (e) {
            console.error(e.message);
            //alert('Ha ocurrido un error al obtener los datos de la Factura');
        }
    }
    const obtenerItems = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/itemFacturaCompras/${params.id}`).then(data => data.data)
            setItems(resultado)
            calcular(resultado)
        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al obtener los datos de la Factura' + e.message);
        }

    }


    return (
        <div className="container">
            <h2 className="mt-4 mb-4 text-center">
                <label className="form-label">
                    {"Factura " + factura.tipo_comprobante}
                </label>
            </h2>
            <div className="form-group row">
                <label className="col-sm-4 col-form-label ms-auto">
                    Factura Nro: {factura.numero}
                </label>
            </div>
            <div className="form-group row">
                <label className="col-sm-4 col-form-label ms-auto">
                    Fecha de emision: {factura.fecha}
                </label>
            </div>
            <div className="form-group row">
                <label className="col-sm-10 col-form-label">
                    Proveedor: {factura.proveedor.nombre}
                </label>
                <div className="col-sm-2">
                    <p className="form-control-static"></p>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-10 col-form-label">
                    CUIT: {factura.proveedor.cuit}
                </label>
                <div className="col-sm-2">
                    <p className="form-control-static"></p>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-10 col-form-label">
                    Dirección: {factura.proveedor.direccion}
                </label>
                <div className="col-sm-2">
                    <p className="form-control-static"></p>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-10 col-form-label">
                    Telefono: {factura.proveedor.telefono}
                </label>
                <div className="col-sm-2">
                    <p className="form-control-static"></p>
                </div>
            </div>
            <div className="form-group row">
                <label className="col-sm-10 col-form-label">
                    Localidad: {factura.proveedor.localidad}
                </label>
                <div className="col-sm-2">
                    <p className="form-control-static"></p>
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
            {factura.tipo_comprobante == "A" && (
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

export default FacturaAForm;