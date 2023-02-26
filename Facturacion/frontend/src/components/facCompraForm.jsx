import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
	const [subtotal, setSubtotal] = useState(0)
	const [iva21, setIva21] = useState(0)
	const [iva105, setIva105] = useState(0)
	const [ivaAcumulado, setIva] = useState(0)

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
		//obtenerItems();
	}, []);

	const handleEdits = (ev) => {
		const value = ev.target.value;
		setFactura(prev => {
			return { ...prev, [ev.target.id]: value }
		});
	};

	const handleEditsProdSel = (ev) => {
		const value = ev.target.value;
		setProductoSeleccionado(prev => {
			return { ...prev, [ev.target.id]: value }
		});
	};

	const handleFechaEmisionChange = (fechaSeleccionada) => {
		const nuevaFactura = { ...factura, fecha: fechaSeleccionada };
		setFactura(nuevaFactura);
	};

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
			//alert('Ha ocurrido un error al obtener los datos de la Factura');
		}
	}

	const obtenerProductos = async () => {
		try {
			let resultado = await axios.get('http://localhost:8000/productos').then(data => data.data)
			setProductos(resultado)
			console.log(productos)
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
	const agregarItem = async () => {
		console.log(productoSeleccionado);
		// try {
		// 	const item = {
		// 		numero_factura_compra: factura.numero,
		// 		codigo_producto: productoSeleccionado.codigo,
		// 		cantidad: productoSeleccionado.cantidad,
		// 	}
		// 	setItems(item);
		// 	console.log(items);
		// }
		// catch (e) {
		// 	console.error(e.message);
		// 	alert('Ha ocurrido un error al agregar el item' + e.message);
		// }
	}

	if (factura.tipo_comprobante === "A") {
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
						<input type="text" className="form-control" id="numero" value={factura.numero} onChange={handleEdits} />
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label ms-auto" id="fecha">Fecha de emisión:</label>
					<div className="col-sm-2">
						<DatePicker
							id="fecha"
							selected={factura.fecha}
							dateFormat="yyyy-MM-dd"
							onChange={handleFechaEmisionChange}
							className="form-control"
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-1 col-form-label" htmlFor='cuit_proveedor'>CUIT:</label>
					<div className="col-sm-2">
						<input type="text" className="form-control" id="cuit_proveedor" value={factura.cuit_proveedor} onChange={handleEdits} />
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
							{/* <th>Descripcion</th>
							<th>PU</th>
							<th>IVA</th>
							<th>Subtotal</th> */}
						</tr>
					</thead>
					<tbody>
						{items.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.cantidad}</td>
									<td>{item.codigo_producto}</td>
									{/* <td>{item.producto.nombre}</td>
									<td>{(item.producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
									<td>{item.producto.alicuotaIVA}</td>
									<td>{(item.cantidad * item.producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td> */}
								</tr>
							);
						})}
					</tbody>
				</Table>
				<div className='form-group row'>
					<label className="col-sm-1 col-form-label" htmlFor='cantidad'>Cantidad:</label>
					<div className="col-sm-2">
						<input type="numeric" className="form-control" id='cantidad' onChange={handleEditsProdSel} />
					</div>
					<label className="col-sm-1 col-form-label" htmlFor='producto'>Producto:</label>
					<div className="col-sm-3">
						<Form.Select id='codigo' onChange={handleEditsProdSel}>
							{productos.map((producto) => (
								<option key={producto.codigo} value={productoSeleccionado.codigo} id='codigo'>{"Cod: " + producto.codigo + " - " + producto.nombre}</option>
							))}
						</Form.Select>
					</div>
					<div className="col-sm-4">
						<Button variant="primary" className="mb-3 col-3" onClick={agregarItem} >Agregar</Button>
					</div>

				</div>
				<br />
				<br />
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
				<div className="mb-3 text-end">
					<Button className="btn btn-primary ms-2" onClick={() => navigate(-1)}>Cancelar</Button>{" "}
					<Button className="btn btn-success ms-2" onClick={() => navigate(-1)}>Generar Factura</Button>
				</div>
			</div>
		);
	} else {
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
						<input type="text" className="form-control" id="numero" value={factura.numero} onChange={handleEdits} />
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-2 col-form-label ms-auto" id="fecha">Fecha de emisión:</label>
					<div className="col-sm-2">
						<DatePicker
							id="fecha"
							selected={factura.fecha}
							dateFormat="yyyy-MM-dd"
							onChange={handleFechaEmisionChange}
							className="form-control"
						/>
					</div>
				</div>

				<div className="form-group row">
					<label className="col-sm-1 col-form-label" htmlFor='cuit_proveedor'>CUIT:</label>
					<div className="col-sm-2">
						<input type="text" className="form-control" id="cuit_proveedor" value={factura.cuit_proveedor} onChange={handleEdits} />
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
						</tr>
					</thead>
					<tbody>
						{/* {items.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.cantidad}</td>
									<td>{item.codigo_producto}</td>
									<td>{item.producto.nombre}</td>
									<td>{(item.producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
									<td>{item.producto.alicuotaIVA}</td>
									<td>{(item.cantidad * item.producto.precio * (1+item.producto.alicuotaIVA)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</td>
								</tr>
							);
						})} */}
					</tbody>
				</Table>
				<div className='form-group row'>
					<label className="col-sm-1 col-form-label" htmlFor='cantidad'>Cantidad:</label>
					<div className="col-sm-2">
						<input type="numeric" className="form-control" id='cantidad' onChange={handleEdits} />
					</div>
					<label className="col-sm-1 col-form-label" htmlFor='producto'>Producto:</label>
					<div className="col-sm-3">
						<Form.Select >
							{productos.map((producto) => (
								<option key={producto.codigo} value={producto.codigo}>{"Cod: " + producto.codigo + " - " + producto.nombre}</option>
							))}
						</Form.Select>
					</div>
					<div className="col-sm-4">
						<Button variant="primary" className="mb-3 col-3">Agregar</Button>
					</div>
				</div>
				<br />
				<br />

				<div className='row justify-content-end'>
					<label className="mb-3 col-3">
						Total:
						<input className="form-control" type="text" value={(subtotal + ivaAcumulado).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} disabled />
					</label>
					<br />
				</div>
				<div className="mb-3 text-end">
					<Button className="btn btn-primary ms-2" onClick={() => navigate(-1)}>Cancelar</Button>{" "}
					<Button className="btn btn-success ms-2" onClick={() => navigate(-1)}>Generar Factura</Button>
				</div>
			</div>
		);
	}

}

export default FacturaCompraForm;