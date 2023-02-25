import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import proveedor from '../../modelo/proveedor';

const estadoInicial = {
    cuit: 0,
    nombre: "",
    direccion: "",
    telefono: "",
    localidad: ""
  };

export default function ProveedorFormulario() {
    const [proveedor, setProveedor] = useState(estadoInicial);
    const navigate = useNavigate();
    //const id = Number(params.cuit)

    useEffect(() => {
        const estadoInicial = {
          cuit: 0,
          nombre: "",
          direccion: "",
          telefono: "",
          localidad: "",
        };
        setProveedor(estadoInicial);
      }, []);


    const grabarProveedor = async () => {
        try {
          if (proveedor.cuit) {
            await axios.post(`http://localhost:8000/proveedor`, proveedor);
            setProveedor({
              cuit: 0,
              nombre: "",
              direccion: "",
              telefono: "",
              localidad: ""
            });
            navigate('../listaProveedores');
          } else {
            alert('Ingrese un cuit valido');
          }
        } catch (e) {
          console.error(e);
          alert('Ha ocurrido un error al grabar el proveedor');
        }
      }

      const handleEdits = (ev) => {
        const { id, value } = ev.target;
        setProveedor({ ...proveedor, [id]: value });
      };



    return (
        <div className="container-fluid" style={{ width: "50vw" }}>
            <form>
                <h2 className="mt-3 text-center">Datos del Proveedor</h2>
                <div className="mb-3 col-2">
                    <label htmlFor="cuit" className="form-label">CUIT</label>
                    <input type="number" className="form-control" id="cuit" value={proveedor.cuit} onChange={handleEdits} />
                </div>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" value={proveedor.nombre} onChange={handleEdits} />
                </div>
                <div className="mb-3">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" value={proveedor.direccion} onChange={handleEdits} />
                </div>
                <div className="mb-3 col-2">
                    <label htmlFor="telefono" className="form-label">Telefono</label>
                    <input type="text" className="form-control" id="telefono" value={proveedor.telefono} onChange={handleEdits} />
                </div>
                <div className="mb-3 col-2">
                    <label htmlFor="localidad" className="form-label">localidad</label>
                    <input type="text" className="form-control" id="localidad" value={proveedor.localidad} onChange={handleEdits} />
                </div>
                <div className="mb-3 text-end">
                    <button className="btn btn-primary me-1" onClick={grabarProveedor}>Aceptar</button>
                    <button className="btn btn-secondary ms-1" onClick={() => navigate('../listaProveedores')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from "react-router-dom";

// const ProveedorForm = () => {
//   const [datos, setDatos] = useState('');
//   const navegar = useNavigate();

//   useEffect(()=>{
//     setDatos()
//   })

//   const agregarProveedor = async () => {
//     try{
//         if(datos.cuit > 0 ){
//             let resultado = await axios.post((`http://localhost:8000/proveedor`, datos))
//         }else{
//             alert("El valor debe ser un numero positivo")
//         }
//     }catch(e){
//         alert(e)
//     }
//   }

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     agregarProveedor
//     console.log({
//       cuit,
//       nombre,
//       direccion,
//       telefono,
//       localidad
//     });
//     //resetea los valores del formulario
//     datos.cuit=0;
//     datos.nombre='';
//     datos.direccion='';
//     datos.telefono='';
//     datos.localidad='';
//   };

//   const handleCancel = () => {
//     // Resetea los valores del formulario
//     datos.cuit='';
//     datos.nombre='';
//     datos.direccion='';
//     datos.telefono='';
//     datos.localidad='';
//     navegar("../listaProveedores")
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="cuit">CUIT:</label>
//         <input type="text" id="cuit" value={datos.cuit} onChange={(event) => datos.cuit=event.target.value} required />
//       </div>
//       <div>
//         <label htmlFor="nombre">Nombre:</label>
//         <input type="text" id="nombre" value={datos.nombre} onChange={(event) => datos.nombre=event.target.value} required />
//       </div>
//       <div>
//         <label htmlFor="direccion">Dirección:</label>
//         <input type="text" id="direccion" value={datos.direccion} onChange={(event) => datos.direccion=event.target.value} required />
//       </div>
//       <div>
//         <label htmlFor="telefono">Teléfono:</label>
//         <input type="text" id="telefono" value={datos.telefono} onChange={(event) => datos.telefono=event.target.value} required />
//       </div>
//       <div>
//         <label htmlFor="localidad">Localidad:</label>
//         <input type="text" id="localidad" value={datos.localidad} onChange={(event) => datos.localidad=event.target.value} required />
//       </div>
//       <button type="submit">Guardar</button>
//       <button type="button" onClick={handleCancel}>Cancelar</button>
//     </form>
//   );
// };

// export default ProveedorForm;
