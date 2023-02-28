import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';




function VerFacturaVenta() {
    const [factura, setFactura] = useState(
        {
            numero: 0,
            fecha: "",
            tipo_comprobante: "",
            presupuesto: null,
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
            total_general: 0
          }
    );

    const [items, setItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const [iva21, setIva21] = useState(0)
    const [iva105, setIva105] = useState(0)
    const [ivaAcumulado, setIva] = useState(0)
    const navigate = useNavigate();
    const params = useParams()

    useEffect(() => {
        obtenerFactura();
    }, []);

    useEffect(() => {
        obtenerItems();
    }, [factura.numero]);

    useEffect(() => {
        calcular(items);
    }, [items.length]);



    const calcular = (i) => {
        console.log(i)
        let subtotal = 0;
        let iva21 = 0;
        let iva105 = 0;
        let ivaAcumulado = 0;
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
    }


    const obtenerFactura = async () => {
        try {
            let resultado = await axios.get(`http://localhost:8000/facturaVentas/${params.id}`).then(data => data.data)
            setFactura(resultado)
        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al obtener las Facturas' + e.message);
        }
    }

    const obtenerItems = async () => {
    	try {
    		let resultado = await axios.get(`http://localhost:8000/itemFacturaVentas/${params.id}`).then(data => data.data)
    		setItems(resultado)
            calcular(resultado)
    	} catch (e) {
    		console.error(e.message);
    		alert('Ha ocurrido un error al obtener los items de la Factura' + e.message);
    	}
    }


    return (
        <div className="container">
            <h2 className="mt-4 mb-4 text-center">
                <label htmlFor="tipo_comprobante">Tipo de factura: {factura.tipo_comprobante}</label>
            </h2>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label ms-auto" htmlFor='numero'>Factura Nro{" "}{factura.numero}</label>
            </div>
            <div className="form-group row">
                <label className="col-sm-3 col-form-label ms-auto" id="fecha">Fecha de emisión:{" "}{factura.fecha}</label>
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
                        <label className="col-sm-3 col-form-label" htmlFor='cuit_vendedor'>CUIT: {factura.vendedor.cuit}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Nombre: {factura.vendedor.nombre}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Dirección: {factura.vendedor.direccion}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Telefono: {factura.vendedor.telefono}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Localidad: {factura.vendedor.localidad}
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
                        <label className="col-sm-3 col-form-label" htmlFor='cuit_cliente'>CUIT: {factura.cliente.cuit}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Razon social: {factura.cliente.nombre}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Dirección: {factura.cliente.direccion}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Telefono: {factura.cliente.telefono}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Localidad: {factura.cliente.localidad}
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
                                <td>{item.producto.alicuotaIva}</td>
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
                            <input className="form-control ms-auto" type="text" value={iva105.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                        <br />
                        <label className="mb-3 col-3">
                            IVA 21:
                            <input className="form-control ms-auto" type="text" value={iva21.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                        <br />
                        <label className="mb-3 col-3">
                            Subtotal IVA:
                            <input className="form-control ms-auto" type="text" value={ivaAcumulado.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                        <label className="mb-3 col-3">
                            Total: 
                            <input className="form-control ms-auto" type="text" value={factura.total_general.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                        </label>
                        <br />
                    </div>
                </>
            ) || (
                    <>
                        <div className='row justify-content-end'>
                            <br />
                            <label className="mb-3 col-3">
                                Total: 
                                <input className="form-control ms-auto" type="text" value={factura.total_general.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                            </label>
                            <br />
                        </div>
                    </>
                )}

            <div className="mb-3 text-end">
                <Button className="btn btn-primary ms-2" onClick={() => navigate(-1)}>volver</Button>{" "}
            </div>
        </div>
    );
}

export default VerFacturaVenta;
