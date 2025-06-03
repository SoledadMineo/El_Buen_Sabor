import { useEffect, useState } from 'react';
import MenuOpciones from "./MenuOpciones";
import { createArticulo } from "../servicios/FuncionesApi";
import { useParams } from 'react-router-dom';

const Formulario = () => {

  const [categorias, setCategorias] = useState([]);
  const [insumos, setInsumos] = useState([]);
  const [imagen, setImagen] = useState(null);

  const [articulo, setArticulo] = useState({
    id:0,
    denominacion: '',
    descripcion: '',
    precioVenta: '',
    precioCosto: '',
    tiempoEstimado: 0,
    categoriaId: 0,
    detalleArtManufacturado: []
  });

  const [detalles, setDetalles] = useState([]);
  const [showDetalleForm, setShowDetalleForm] = useState(false);
  const [nuevoDetalle, setNuevoDetalle] = useState({
    idArtInsumo: '',
    cantidad: ''
  });

  const handleChange = e => {
    console.log("check", e.target.id, e.target.value)
    setArticulo({ ...articulo, [e.target.id]: e.target.value });
  };

  const handleImagenChange = e => {
    setImagen(e.target.files[0]);
  };

  const handleNuevoDetalleChange = e => {
    setNuevoDetalle({ ...nuevoDetalle, [e.target.name]: Number(e.target.value) });
  };

  const confirmarDetalle = () => {
    if (nuevoDetalle.idArtInsumo && nuevoDetalle.cantidad) {
      setDetalles([...detalles, nuevoDetalle]);
      setNuevoDetalle({ idArtInsumo: '', cantidad: '' });
      setShowDetalleForm(false);
    }
  };

  const eliminarDetalle = index => {
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const editarDetalle = index => {
    setNuevoDetalle(detalles[index]);
    setDetalles(detalles.filter((_, i) => i !== index));
    setShowDetalleForm(true);
  };

  const calcularPrecioCosto = () => {
    let totalCosto = 0;

    detalles.forEach(det => {
      const insumo = insumos.find(i => i.id === Number(det.idArtInsumo));
      if (insumo && det.cantidad) {
        totalCosto += insumo.precioCompra * Number(det.cantidad);
      }
    });

    // Redondear a 2 decimales
    const precioCosto = parseFloat(totalCosto.toFixed(2));
    const precioVenta = parseFloat((precioCosto * 1.30).toFixed(2));

    setArticulo(prev => ({
      ...prev,
      precioCosto,
      precioVenta
    }));
  };

  const { idArticulo } = useParams();  
  console.log("id", idArticulo)
  // console.log("check", detalles, insumos, articulo)

  useEffect(() => {
    fetch('http://localhost:3000/api/categorias-manufacturados')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(err => console.error('Error al cargar categorías:', err));

    fetch('http://localhost:3000/api/insumos')
      .then(res => res.json())
      .then(data => setInsumos(data))
      .catch(err => console.error('Error al cargar categorías:', err));
  }, []);

  useEffect(() => {
  if (idArticulo) {
    fetch(`http://localhost:3000/api/articulos-manufacturados/${idArticulo}`)
      .then(res => res.json())
      .then(data => {
        console.log("data", data)
        setArticulo({
          id: data.id,
          denominacion: data.denominacion,
          descripcion: data.descripcion,
          precioVenta: data.precioVenta,
          precioCosto: data.precioCosto,
          tiempoEstimado: data.tiempoEstimado,
          categoriaId: data.categoriaId,
          detalleArtManufacturado: data.articulomanufacturadodetalles
          
        });
        
        setDetalles(data.articulomanufacturadodetalles);
      })
      .catch(err => console.error('Error al cargar artículo:', err));
  }
}, [idArticulo]);


  useEffect(() => {
    console.log("cambio detalles")
    calcularPrecioCosto()
  }, [detalles])

  const guardarArticuloManufacturado = () => {
    const formData = new FormData();

    formData.append('denominacion', articulo.denominacion);
    formData.append('descripcion', articulo.descripcion);
    formData.append('precioVenta', articulo.precioVenta);
    formData.append('precioCosto', articulo.precioCosto);
    formData.append('tiempoEstimado', articulo.tiempoEstimado);
    formData.append('categoriaId', articulo.categoriaId);
    formData.append('detalles', JSON.stringify(detalles));

    if(imagen)formData.append('imagenes', imagen);

    if (articulo.id && articulo.id !== 0) {
      // Editar
      fetch(`http://localhost:3000/api/articulos-manufacturados/${articulo.id}`, {
        method: 'PUT',
        body: formData
      })
      .then(res => res.json())
      .then(data => alert('Artículo editado correctamente'))
      .catch(err => console.error('Error al editar artículo:', err));
    } else {
    // Crear
      fetch(`http://localhost:3000/api/articulos-manufacturados`, {
        method: 'POST',
        body: formData
      })
      .then(res => res.json())
      .then(data => alert('Artículo creado correctamente'))
      .catch(err => console.error('Error al crear artículo:', err));
    }
  };
 
  const nombreInsumo = (id) => {
    const insumoEncontrado = insumos.find(i => i.id === Number(id));
    //console.log("insumo encontrado", insumoEncontrado)
    return insumoEncontrado?.denominacion || insumoEncontrado?.articuloInsumo.denominacion || "--";
  }

  return (
    <>
      <MenuOpciones></MenuOpciones>
      <form className="container mt-4">
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="denominacion" className="form-label"><b>Denominación</b></label>
            <input
              type="text"
              className="form-control"
              id="denominacion"
              name="denominacion"
              value={articulo.denominacion}
              onChange={handleChange}
              placeholder="Ingrese la denominación"
            />
          </div>
          <div className="col">
            <label htmlFor="descripcion" className="form-label"><b>Descripción</b></label>
            <input
              type="text"
              className="form-control"
              id="descripcion"
              name="descripcion"
              value={articulo.descripcion}
              onChange={handleChange}
              placeholder="Ingrese la descripción"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label className="form-label"><b>Categoría</b></label>
            <select className="form-select" id="categoriaId" value={articulo.categoriaId} onChange={handleChange}>
              <option value="">Seleccione una categoría</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.denominacion}</option>
              ))}
            </select>
          </div>
          <div className="col">
            <label className="form-label"><b>Imagen</b></label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImagenChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="precioCosto" className="form-label"><b>Precio Costo</b></label>
            <input type="number" className="form-control" id="precioCosto" placeholder="Precio de costo" value={articulo.precioCosto} readOnly />
          </div>
          <div className="col">
            <label htmlFor="precioVenta" className="form-label"><b>Precio Venta</b></label>
            <input type="number" className="form-control" id="precioVenta" placeholder="Precio de venta" value={articulo.precioVenta} readOnly />
          </div>
          <div className="col">
            <label htmlFor="tiempoEstimado" className="form-label"><b>Tiempo Estimado (min)</b></label>
            <input type="number" className="form-control" id="tiempoEstimado" placeholder="Ingrese el tiempo estimado" value={articulo.tiempoEstimado} onChange={handleChange} />
          </div>
        </div>

        <hr />
        <h5>Detalles de insumos</h5>

        {detalles.length > 0 && (
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Insumo</th>
                <th>Cantidad</th>
                <th style={{ width: 120 }}></th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((d, idx) => (
                <tr key={idx}>
                  <td>{nombreInsumo(d.idArtInsumo || d.articuloInsumo.id)}</td>
                  <td>{d.cantidad}</td>
                  <td>
                    <button type="button" className="btn btn-outline-secondary btn-sm me-1"
                      onClick={() => editarDetalle(idx)}>Editar</button>
                    <button type="button" className="btn btn-outline-danger btn-sm"
                      onClick={() => eliminarDetalle(idx)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* botón agregar */}
        {!showDetalleForm && (
          <button type="button" className="btn btn-success mb-3"
            onClick={() => setShowDetalleForm(true)}>
            Agregar detalle
          </button>
        )}

        {/* formulario de nuevo detalle */}
        {showDetalleForm && (
          <div className="row align-items-end g-2 mb-3">
            <div className="col-md-6">
              <label className="form-label">Insumo</label>
              <select className="form-select" name="idArtInsumo"
                value={nuevoDetalle.idArtInsumo} onChange={handleNuevoDetalleChange}>
                <option value="">Seleccione un insumo</option>
                {insumos.map(i => (
                  <option key={i.id} value={i.id}>{i.denominacion}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label">Cantidad</label>
              <input type="number" className="form-control" name="cantidad"
                value={nuevoDetalle.cantidad} onChange={handleNuevoDetalleChange} />
            </div>
            <div className="col-md-3 d-flex">
              <button type="button" className="btn btn-primary me-2 flex-grow-1"
                onClick={confirmarDetalle}>Confirmar</button>
              <button type="button" className="btn btn-secondary flex-grow-1"
                onClick={() => { setNuevoDetalle({ idArtInsumo: '', cantidad: '' }); setShowDetalleForm(false); }}>
                Cancelar
              </button>
            </div>
          </div>
        )}
        <br />
        <button type="button" className="btn btn-primary" onClick={guardarArticuloManufacturado}>
          Guardar Artículo
        </button>
        </form>
    </>
  );
};

export default Formulario;
