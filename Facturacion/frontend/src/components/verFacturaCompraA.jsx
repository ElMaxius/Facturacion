import React, { useState } from 'react';

function FacturaAForm() {
    const [factura, setFacturaCompra] = useState({});
    // const [numeroFactura, setNumeroFactura] = useState('');
    // const [fechaFactura, setFechaFactura] = useState('');
    // const [proveedorCuit, setproveedorCuit] = useState('');
    const [proveedor, setProveedor] = useState()
    // const [proveedorNombre, setproveedorNombre] = useState('');
    // const [proveedorDireccion, setproveedorDireccion] = useState('');
    // const [proveedorTelefono, setproveedorTelefono] = useState('');
    // const [proveedorLocalidad, setproveedorLocalidad] = useState('');
    const [items, setItems] = useState([]);
    // const [subtotal, setSubtotal] = useState(0);
    // const [iva, setIVA] = useState(0);
    // const [total, setTotal] = useState(0);

    useEffect(() => {
        obtenerDatosFactura()
      }, []);

    const obtenerDatosFactura = async () => {
        try{
                let resultado = await axios.get(`http://localhost:8000/facturaCompras/${params.id}`)
                console.log(resultado)
                setFacturaCompra(resultado.data)

        }catch (e){
            console.error(e);
            alert('Ha ocurrido un error al obtener los datos de la Factura');
        }
    }

    const getProveedor = async (id) => {
        try {
            let response = await axios.get(`http://localhost:8000/proveedor/${factura}`)
            const prov = response.data;
            setProveedor
        } catch (e) {
            console.error(e);
            alert('Ha ocurrido un error al obtener el proveedor');
        }
    }

    const calcularTotales = () => {
        const nuevoSubtotal = items.reduce((total, item) => total + item.cantidad * item.precioUnitario, 0);
        setSubtotal(nuevoSubtotal);
        const nuevoIVA = nuevoSubtotal * 0.21; // Tasa de IVA del 21%
        setIVA(nuevoIVA);
        const nuevoTotal = nuevoSubtotal + nuevoIVA;
        setTotal(nuevoTotal);
    }

    return (
        <div>
            <h2>Factura A</h2>
            <form>
                <label>
                    Número de factura:
                    <input type="text" value={numeroFactura} onChange={(e) => setNumeroFactura(e.target.value)} />
                </label>
                <label>
                    Fecha de factura:
                    <input type="date" value={fechaFactura} onChange={(e) => setFechaFactura(e.target.value)} />
                </label>
                <label>
                    Nombre del cliente:
                    <input type="text" value={proveedorNombre} onChange={(e) => setproveedorNombre(e.target.value)} />
                </label>
                <label>
                    Dirección del cliente:
                    <input type="text" value={proveedorDireccion} onChange={(e) => setproveedorDireccion(e.target.value)} />
                </label>
                <table>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>IVA</th>
                            <th>Precio Unitario</th>
                            <th>Subtotal</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.codigo}</td>
                                <td>{item.nombre}</td>
                                <td>{item.cantidad}</td>
                                <td>{item.iva}</td>
                                <td>{item.precioUnitario}</td>
                                <td>{item.cantidad * item.precioUnitario}</td>
                                <td><button onClick={() => handleEliminarItem(index)}>Eliminar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAgregarItem}>Agregar Item</button>
                <br />
                <br />
                <label>
                    Subtotal:
                    <input type="text" value={subtotal} disabled />
                </label>
                <br />
                <label>
                    IVA (21%):
                    <input type="text" value={iva} disabled />
                </label>
                <br />
                <label>
                    Total:
                    <input type="text" value={total} disabled />
                </label>
                <br />
                <button type="submit" onClick={calcularTotales}>Calcular Totales</button>
            </form>
        </div>
    );
}

export default FacturaAForm;