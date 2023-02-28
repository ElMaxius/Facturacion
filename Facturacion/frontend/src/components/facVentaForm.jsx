import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from 'date-fns';


function FacturaVentaFormulario() {
    const [factura, setFactura] = useState({
        numero: 0,
        fecha: "",
        tipo_comprobante: "",
        numero_presupuesto:0,
        cuit_vendedor: 0,
        cuit_cliente: 0,
        total_general: 0.0
    });

    const [vendedor, setVendedor] = useState({
        cuit: 0,
        nombre: "",
        direccion: "",
        telefono: "",
        localidad: ""
    });
    const [cliente, setCliente] = useState({
        cuit: 0,
        nombre: "",
        direccion: "",
        telefono: "",
        localidad: ""
    });
    const [productos, setProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState([])
    const [itemsTemp, setItemsTemp] = useState([]);
    const [subtotal, setSubtotal] = useState(0)
    const [iva21, setIva21] = useState(0)
    const [iva105, setIva105] = useState(0)
    const [ivaAcumulado, setIva] = useState(0)
    const [deletedIdx, setDeletedIdx] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setFactura({
            numero: 0,
            fecha: "",
            tipo_comprobante: "",
            cuit_proveedor: 0,
            total_general: 0.0
        })
    }, []);

    useEffect(() => {
        obtenerProductos();
        console.log(factura)
    }, []);

    useEffect(() => {
        obtenerFacturas();
    }, []);

    const buscarUltimo = (result) => {
        const numeroMaximo = result.reduce((a, b) => a.numero > b.numero ? a : b).numero;
        console.log(numeroMaximo)
        setFactura(f => ({ ...f, numero: numeroMaximo + 1 }))
    }

    useEffect(() => {
        setFactura(f => ({ ...f, total_general: subtotal + ivaAcumulado }));
    }, [subtotal, ivaAcumulado]);

    useEffect(() => {
        calcular(itemsTemp);
    }, [itemsTemp]);

    useEffect(() => {
        setItemsTemp(() => {
            return itemsTemp.map((item) => {
                item.subtotalTemp = (item.precio * item.cantidad) * (factura.tipo_comprobante == 'A' ? 1 : 1 + item.iva)
                return item;
            });
        })
    }, [factura.tipo_comprobante]);


    const handleEdits = (ev) => {
        const value = ev.target.value;
        setFactura(prev => {
            return { ...prev, [ev.target.id]: value }
        });
    };

    const handleEditsProdSel = (ev) => {
        const codigo = ev.target.value;
        console.log(codigo);
        const prodSel = productos.find(x => x.codigo == codigo)
        console.log(prodSel);
        setProductoSeleccionado(prodSel);
    };

    const handleFechaEmisionChange = (date) => {
        setFactura({
            ...factura,
            fecha: format(parseISO(date.toISOString()), "yyyy-MM-dd"),
        });
    };

    const calcular = (i) => {
        let subtotal = 0;
        let iva21 = 0;
        let iva105 = 0;
        let ivaAcumulado = 0;
        console.log("calcular", i)
        try {
            i.forEach((item) => {
                subtotal += item.precio * item.cantidad;
                if (item.iva == 0.105) {
                    iva105 += item.iva * (item.cantidad * item.precio);
                }
                else if (item.iva == 0.21) {
                    iva21 += item.iva * (item.cantidad * item.precio);
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
        console.log(factura)

    }
    const validarCuitVendedor = () => {
        if (factura.cuit_vendedor != 0) {
            obtenerVendedor();
            console.log(factura)
        } else {
            alert("Debe ingresar un CUIT valido")
        }
    }
    const validarCuitCliente = () => {
        if (factura.cuit_cliente != 0) {
            obtenerCliente();
            console.log(factura)
        } else {
            alert("Debe ingresar un CUIT valido")
        }
    }


    const obtenerVendedor = async () => {
        console.log(factura.cuit_vendedor)
    	try {
    		let resultado = await axios.get(`http://localhost:8000/vendedor/${factura.cuit_vendedor}`).then(data => data.data)
    		setVendedor(resultado)
    	} catch (e) {
    		console.error(e.message);
    		alert('Ha ocurrido un error al obtener los datos del Vendedor ' + e.message);
    	}
    }
    const obtenerCliente = async () => {
    	try {
    		let resultado = await axios.get(`http://localhost:8000/cliente/${factura.cuit_cliente}`).then(data => data.data)
    		setCliente(resultado)
    	} catch (e) {
    		console.error(e.message);
    		alert('Ha ocurrido un error al obtener los datos del Cliente ' + e.message);
    	}
    }

    const obtenerFacturas = async () => {
        try {
            let resultado = await axios.get('http://localhost:8000/facturaVentas').then(data => data.data)
            console.log(resultado)
            buscarUltimo(resultado)
        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al obtener las Facturas' + e.message);
        }
    }

    const obtenerProductos = async () => {
        try {
            let resultado = await axios.get('http://localhost:8000/productos').then(data => data.data)
            setProductos(resultado)
            console.log(resultado);
        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al obtener los Productos' + e.message);
        }
    }

    const agregarItemTemporal = () => {
        try {
            if (factura.numero > 0) {
                const itemTemporal = {
                    numero_factura_venta: factura.numero,
                    codigo_producto: productoSeleccionado.codigo,
                    descripcion: productoSeleccionado.nombre,
                    precio: productoSeleccionado.precio,
                    iva: productoSeleccionado.alicuotaIVA,
                    cantidad: document.getElementById('cantidad').value,
                    subtotalTemp: ((productoSeleccionado.precio * document.getElementById('cantidad').value) * (factura.tipo_comprobante == 'A' ? 1 : 1 + productoSeleccionado.alicuotaIVA)),
                };
                setItemsTemp([...itemsTemp, itemTemporal]);
            } else {
                alert('Debe ingresar un numero de factura')
            }
        } catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al agregar el item: ' + e.message);
        }

    };

    useEffect(() => {
		if (deletedIdx !== null) {
		  setItemsTemp(itemsTemp.filter((_, i) => i !== deletedIdx));
		  setDeletedIdx(null);
		}
	  }, [deletedIdx]);

	const borrarItemTemp = (idx) => {
		setDeletedIdx(idx);
		setItemsTemp(itemsTemp.filter((_, i) => i !== idx));
	  };

    const agregarItem = async (itemFinal) => {
        try {
            const result = await axios.post(`http://localhost:8000/itemFacturaVentas`, itemFinal);
            console.log(result);
        }
        catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al agregar el item: ' + e.message);
        }

    };

    const adaptarItems = (it) => {
        try {
            it.forEach((item) => {
                const itemFinal = {
                    numero_facturaVenta: item.numero_factura_venta,
                    codigo_producto: item.codigo_producto,
                    cantidad: item.cantidad,
                    subtotal: item.subtotalTemp
                };
                console.log(itemFinal)
                agregarItem(itemFinal)
            });
        }
        catch (e) {
            alert('Ha ocurrido un error al adaptar los items: ' + e.message);
        }
    };

    const agregarTotal = () => {
        try {
            const total_general = subtotal + ivaAcumulado;
            setFactura(prev => {
                return { ...prev, total_general: total_general }
            });
        }
        catch (e) {
            console.error(e.message);
            alert('Ha ocurrido un error al setear el total general: ' + e.message);
        }

    };
    const agregarFactura = async () => {
        try {
            await axios.post(`http://localhost:8000/facturaVentas`, factura);
        }
        catch (e) {
            alert('Ha ocurrido un error al agregar la Factura: ' + e.message);
        }
    };

    const GenerarFactura = async () => {
        if ((factura.tipo_comprobante != "") && (factura.numero != 0) && (factura.fecha != "")) {
            if (itemsTemp.length > 0) {
                agregarTotal();
                console.log(factura)
                agregarFactura();
                adaptarItems(itemsTemp)
                navigate(-1)
            } else {
                alert("La factura debe contener al menos un producto")
            }
        } else {
            alert("Debe completar todos los datos descriptivos de la factura")
        }

    }

    return (
        <div className="container">
            <h2 className="mt-4 mb-4 text-center">
                <label htmlFor="tipo_comprobante">Tipo de factura:</label>
                <select id="tipo_comprobante" name="tipo_comprobante" onChange={handleEdits} defaultValue="">
                    <option value=""></option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                </select>
            </h2>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label ms-auto" htmlFor='numero'>Factura Nro:</label>
                <div className="col-sm-2">
                    <input type="text" className="form-control" id="numero" value={factura.numero} onChange={handleEdits} disabled />
                </div>
            </div>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label ms-auto" id="fecha">Fecha de emisión:</label>
                <div className="col-sm-2 mb-4">
                    <DatePicker
                        id="fecha"
                        selected={factura.fecha ? parseISO(factura.fecha) : null}
                        dateFormat="yyyy-MM-dd"
                        onChange={handleFechaEmisionChange}
                        className="form-control"
                    />
                </div>
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
                        <label className="col-sm-1 col-form-label" htmlFor='cuit_vendedor'>CUIT:</label>
                        <div className="col-sm-5">
                            <input type="number" min="1" max="99999999999" className="form-control" id="cuit_vendedor" value={factura.cuit_vendedor} onChange={handleEdits} />
                        </div>
                        <Button variant="primary" className="col-sm-2" onClick={validarCuitVendedor}>validar</Button>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Nombre: {vendedor.nombre}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Dirección: {vendedor.direccion}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Telefono: {vendedor.telefono}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Localidad: {vendedor.localidad}
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
                        <label className="col-sm-1 col-form-label" htmlFor='cuit_cliente'>CUIT:</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" id="cuit_cliente" value={factura.cuit_cliente} onChange={handleEdits} />
                        </div>
                        <Button variant="primary" className="col-sm-2" onClick={validarCuitCliente}>validar</Button>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Razon social: {cliente.nombre}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Dirección: {cliente.direccion}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Telefono: {cliente.telefono}
                        </label>
                        <div className="col-sm-12">
                            <p className="form-control-static"></p>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-12 col-form-label">
                            Localidad: {cliente.localidad}
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
                    {itemsTemp.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.cantidad}</td>
                                <td>{item.codigo_producto}</td>
                                <td>{item.descripcion}</td>
                                <td>{(item.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                <td>{item.iva}</td>
                                <td>{(item.subtotalTemp).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
                                <td><Button variant="danger" type="button" onClick={() => borrarItemTemp(index)}>Borrar</Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <div className='form-group row'>
                <label className="col-sm-1 col-form-label" htmlFor='cantidad'>Cantidad:</label>
                <div className="col-sm-2">
                    <input type="numeric" className="form-control" id='cantidad' />
                </div>
                <label className="col-sm-1 col-form-label" htmlFor='producto'>Producto:</label>
                <div className="col-sm-3">
                    <select className='form-control form-select' id="opcion_Producto" name="opcion_Producto" onChange={handleEditsProdSel}>
                        <option value="" selected></option>
                        {productos.map((producto) => (
                            <option key={producto.codigo} value={producto.codigo} id='codigo'>{"Cod: " + producto.codigo + " - " + producto.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col-sm-4">
                    <Button variant="primary" className="mb-3 col-4" onClick={agregarItemTemporal} >Agregar</Button>
                </div>
            </div>
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
                            <input className="form-control" type="text" id='total_general' onChange={handleEdits} value={(subtotal + ivaAcumulado).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
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
                                <input className="form-control" type="text" id='total_general' onChange={handleEdits} value={(subtotal + ivaAcumulado).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
                            </label>
                            <br />
                        </div>
                    </>
                )}

            <div className="mb-3 text-end">
                <Button className="btn btn-primary ms-2" onClick={() => navigate(-1)}>Cancelar</Button>{" "}
                <Button className="btn btn-success ms-2" onClick={GenerarFactura}>Generar Factura</Button>
            </div>
        </div>
    );
}

export default FacturaVentaFormulario;
