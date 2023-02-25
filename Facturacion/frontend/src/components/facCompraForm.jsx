import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

export default function FacCompraFormulario() {
  const [facCompra, setFacCompra] = useState({
    tipo: null,
    numero: null,
    fecha: null,
    cuit: null,
    total: null,
  });

  const [proveedores, setProveedores] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    /* LLAMAR AL BACK PARA Q DEVUELVA LOS PROVEEDORES */
    setProveedores([
      {
        cuit: 123456,
        nombre: "mario luis",
      },
      {
        cuit: 234567,
        nombre: "juan miguekl",
      },
      {
        cuit: 345687,
        nombre: "ana maria",
      },
    ]);
    return () => {};
  }, []);

  useEffect(() => {
    /* LLAMAR AL BACK PARA Q DEVUELVA LOS ITEMS */
    setItems([
      {
        codigo: 123456,
        nombre: "arroz",
        precio: 12,
        iva: 21,
      },
      {
        codigo: 234567,
        nombre: "fideo",
        precio: 15,
        iva: 21,
      },
      {
        codigo: 345687,
        nombre: "tomate",
        precio: 8,
        iva: 21,
      },
    ]);
    return () => {};
  }, []);

  function handleTipoChange(tipo) {
    /* HACER LAS VALIDACIONES PERTINENTES */
    setFacCompra({
      ...facCompra,
      tipo: tipo,
    });
  }

  function handleNumeroChange(nro) {
    /* HACER LAS VALIDACIONES PERTINENTES */
    setFacCompra({
      ...facCompra,
      numero: nro,
    });
  }

  function handleDateChange(fecha) {
    /* HACER LAS VALIDACIONES PERTINENTES */
    setFacCompra({
      ...facCompra,
      fecha: fecha,
    });
  }

  function handleCuitChange(cuit) {
    /* HACER LAS VALIDACIONES PERTINENTES */
    setFacCompra({
      ...facCompra,
      cuit: cuit,
    });
  }

  return (
    <>
      <h1>Factura Compra</h1>
      <div className="container-fluid" style={{ width: "50vw" }}>
        <form>
          {/* TIPO */}
          <div className="mb-3">
            <label className="form-label">Tipo de factura</label>
            <select
              className="form-select"
              aria-label="Tipo de factura"
              onChange={($event) => handleNumeroChange($event.target.value)}
            >
              <option value="1">A</option>
              <option value="2">B</option>
              <option value="3">C</option>
            </select>
          </div>

          {/* NUMERO */}
          <div className="mb-3">
            <label htmlFor="nroFacturaInput" className="form-label">
              Nro de factura
            </label>
            <input
              type="number"
              onChange={($event) => handleNumeroChange($event.target.value)}
              className="form-control"
              id="nroFacturaInput"
            />
          </div>

          {/* FECHA */}
          <div className="mb-3">
              <div className="form-group">
                <label htmlFor="fecha">Fecha:</label>
                <br />
                <DatePicker
                  className="form-control"
                  dateFormat={"yyyy/dd/MM"}
                  selected={facCompra.fecha}
                  onChange={handleDateChange}
                />
              </div>
          </div>

          {/* CUIT */}
          <div className="mb-3">
            <label htmlFor="nroFacturaInput" className="form-label">
              CUIT
            </label>
            <input
              type="number"
              onChange={($event) => handleCuitChange($event.target.value)}
              className="form-control"
              id="nroFacturaInput"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
