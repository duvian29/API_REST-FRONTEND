import React, { useState, useEffect } from 'react';
import { getProductoras, crearProductora, eliminarProductora } from '../servicios/productoraService';

const Productoras = () => {

    const [mostrarForm, setMostrarForm] = useState(false);
    const [listaProductoras, setListaProductoras] = useState([]);

    const [productora, setProductora] = useState({
        nombre: '',
        slogan: '',
        descripcion: '',
        estado: 'Activo'
    });

    //  CARGAR PRODUCTORAS
    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getProductoras();
                setListaProductoras(data);
            } catch (error) {
                console.error("Error al cargar productoras:", error);
            }
        };

        cargar();
    }, []);

    //  CREAR
    const manejarGuardar = async (e) => {
        e.preventDefault();

        try {
            await crearProductora({
                nombre: productora.nombre,
                slogan: productora.slogan,
                descripcion: productora.descripcion,
                estado: productora.estado === 'Activo'
            });

            setProductora({
                nombre: '',
                slogan: '',
                descripcion: '',
                estado: 'Activo'
            });

            setMostrarForm(false);

            const data = await getProductoras();
            setListaProductoras(data);

        } catch (error) {
            console.error("Error al crear productora:", error);
        }
    };

    //  ELIMINAR
    const borrarProductora = async (id) => {
        if (window.confirm('¿Deseas eliminar esta productora?')) {
            try {
                await eliminarProductora(id);

                const data = await getProductoras();
                setListaProductoras(data);

            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Productoras</h2>
                <button 
                    className={`btn ${mostrarForm ? 'btn-secondary' : 'btn-primary'}`} 
                    onClick={() => setMostrarForm(!mostrarForm)}
                >
                    <i className={`bi ${mostrarForm ? 'bi-x-lg' : 'bi-plus-lg'}`}></i> 
                    {mostrarForm ? ' Cancelar' : ' Agregar Productora'}
                </button>
            </div>

            {/* FORMULARIO */}
            {mostrarForm && (
                <div className="card mb-4 shadow-sm border-primary">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Nueva Productora</h5>
                    </div>
                    <div className="card-body">
                        <form className="row g-3" onSubmit={manejarGuardar}>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Nombre</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={productora.nombre}
                                    onChange={(e) => setProductora({...productora, nombre: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Slogan</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    value={productora.slogan}
                                    onChange={(e) => setProductora({...productora, slogan: e.target.value})}
                                />
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-bold">Descripción</label>
                                <textarea 
                                    className="form-control"
                                    value={productora.descripcion}
                                    onChange={(e) => setProductora({...productora, descripcion: e.target.value})}
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Estado</label>
                                <select 
                                    className="form-select"
                                    value={productora.estado}
                                    onChange={(e) => setProductora({...productora, estado: e.target.value})}
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-success">
                                    Guardar Productora
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* TABLA */}
            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Slogan</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {listaProductoras.map((prod, index) => (
                        <tr key={prod._id}>
                            <td>{index + 1}</td>
                            <td>{prod.nombre}</td>
                            <td>{prod.slogan}</td>
                            <td>{prod.descripcion}</td>
                            <td>
                                <span className={`badge ${prod.estado ? 'bg-success' : 'bg-danger'}`}>
                                    {prod.estado ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => borrarProductora(prod._id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default Productoras;