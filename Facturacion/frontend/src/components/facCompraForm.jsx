import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, format } from 'date-fns';


function FacturaCompraForm() {
	const [factura, setFactura] = useState({
		numero: 0,
		fecha: "",
		tipo_comprobante: "",
		cuit_proveedor: 0,
		total_general: 0.0
	});

	const [proveedor, setProveedor] = useState({
		cuit: 0,
		nombre: "",
		direccion: "",
		telefono: "",
		localidad: ""
	});
	const [productos, setProductos] = useState([])
	const [productoSeleccionado, setProductoSeleccionado] = useState([])
	const [items, setItems] = useState([]);
	const [itemsTemp, setItemsTemp] = useState([]);
	const [subtotal, setSubtotal] = useState(0)
	const [iva21, setIva21] = useState(0)
	const [iva105, setIva105] = useState(0)
	const [ivaAcumulado, setIva] = useState(0)
	const [deletedIdx, setDeletedIdx] = useState(null);
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (params.id === "-1") {
			setFactura({
				numero: 0,
				fecha: "",
				tipo_comprobante: "",
				cuit_proveedor: 0,
				total_general: 0.0
			})
		} else {
			obtenerItems();
		}
	}, [params.id]);

	useEffect(() => {
		obtenerProductos();
		console.log(factura)
	}, []);

	useEffect(() => {
		setFactura(f => ({ ...f, total_general: subtotal + ivaAcumulado }));
	}, [subtotal, ivaAcumulado]);

	useEffect(() => {
		calcular(itemsTemp);
	}, [itemsTemp]);

	useEffect(() => {
		setItemsTemp(()=>{
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
	const validarCuit = () => {
		if (factura.cuit_proveedor != 0) {
			obtenerProveedor();
			console.log(factura)

		} else {
			alert("Debe ingresar un CUIT valido")
		}
	}


	const obtenerProveedor = async () => {
		try {
			let resultado = await axios.get(`http://localhost:8000/proveedor/${factura.cuit_proveedor}`).then(data => data.data)
			setProveedor(resultado)
		} catch (e) {
			console.error(e.message);
			alert('Ha ocurrido un error al obtener los datos del Proveedor' + e.message);
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
	const agregarItemTemporal = () => {
		try {
			if (factura.numero > 0) {
				const itemTemporal = {
					numero_factura_compra: factura.numero,
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

	const agregarItem = async (itemFinal) => {
		try {
			const result = await axios.post(`http://localhost:8000/itemFacturaCompras`, itemFinal);
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
					numero_factura_compra: item.numero_factura_compra,
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
			await axios.post(`http://localhost:8000/facturaCompras`, factura);
		}
		catch (e) {
			alert('Ha ocurrido un error al agregar la Factura, el numero de factura ya existe: ' + e.message);
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
					<input type="number" min="1" className="form-control" id="numero" value={factura.numero} onChange={handleEdits} />
				</div>
			</div>

			<div className="form-group row">
				<label className="col-sm-2 col-form-label ms-auto" id="fecha">Fecha de emisión:</label>
				<div className="col-sm-2">
					<DatePicker
						id="fecha"
						selected={factura.fecha ? parseISO(factura.fecha) : null}
						dateFormat="yyyy-MM-dd"
						onChange={handleFechaEmisionChange}
						className="form-control"
					/>
				</div>
			</div>

			<div className="form-group row">
				<label className="col-sm-1 col-form-label" htmlFor='cuit_proveedor'>CUIT:</label>
				<div className="col-sm-2">
					<input type="text" className="form-control" id="cuit_proveedor" value={factura.cuit_proveedor} onChange={handleEdits} required/>
				</div>
				<Button variant="primary" className="col-sm-1" onClick={validarCuit}>validar</Button>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">
					Razon social: {proveedor.nombre}
				</label>
				<div className="col-sm-2">
					<p className="form-control-static"></p>
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">
					Dirección: {proveedor.direccion}
				</label>
				<div className="col-sm-2">
					<p className="form-control-static"></p>
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">
					Telefono: {proveedor.telefono}
				</label>
				<div className="col-sm-2">
					<p className="form-control-static"></p>
				</div>
			</div>
			<div className="form-group row">
				<label className="col-sm-2 col-form-label">
					Localidad: {proveedor.localidad}
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
						<th></th>
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
					<Button variant="primary" className="mb-3 col-3" onClick={agregarItemTemporal} >Agregar</Button>
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

export default FacturaCompraForm;