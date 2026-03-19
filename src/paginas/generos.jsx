import React, { useState, useEffect } from 'react';
import { getGeneros, crearGenero, eliminarGenero } from '../servicios/generoService';

const Generos = () => {

    const [mostrarForm, setMostrarForm] = useState(false);
    const [listaGeneros, setListaGeneros] = useState([]);

    const [genero, setGenero] = useState({
        nombre: '',
        descripcion: '',
        estado: 'Activo'
    });

    //  CARGAR GENEROS
    useEffect(() => {
        const cargar = async () => {
            try {
                const data = await getGeneros();
                setListaGeneros(data);
            } catch (error) {
                console.error("Error al cargar géneros:", error);
            }
        };

        cargar();
    }, []);

    //  CREAR GENERO
    const manejarGuardar = async (e) => {
        e.preventDefault();

        try {
            await crearGenero({
                nombre: genero.nombre,
                descripcion: genero.descripcion,
                estado: genero.estado === 'Activo'
            });

            setGenero({ nombre: '', descripcion: '', estado: 'Activo' });
            setMostrarForm(false);

            const data = await getGeneros();
            setListaGeneros(data);

        } catch (error) {
            console.error("Error al crear género:", error);
        }
    };

    //  ELIMINAR
    const borrarGenero = async (id) => {
        if (window.confirm('¿Deseas eliminar este género?')) {
            try {
                await eliminarGenero(id);

                const data = await getGeneros();
                setListaGeneros(data);

            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Géneros</h2>
                <button 
                    className={`btn ${mostrarForm ? 'btn-secondary' : 'btn-primary'}`} 
                    onClick={() => setMostrarForm(!mostrarForm)}
                >
                    <i className={`bi ${mostrarForm ? 'bi-x-lg' : 'bi-plus-lg'}`}></i> 
                    {mostrarForm ? ' Cancelar' : ' Agregar Género'}
                </button>
            </div>

            {/* FORMULARIO */}
            {mostrarForm && (
                <div className="card mb-4 shadow-sm border-primary">
                    <div className="card-header bg-primary text-white">
                        <h5 className="mb-0">Nuevo Género</h5>
                    </div>
                    <div className="card-body">
                        <form className="row g-3" onSubmit={manejarGuardar}>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={genero.nombre}
                                    onChange={(e) => setGenero({...genero, nombre: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label fw-bold">Estado</label>
                                <select 
                                    className="form-select"
                                    value={genero.estado}
                                    onChange={(e) => setGenero({...genero, estado: e.target.value})}
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            <div className="col-12">
                                <label className="form-label fw-bold">Descripción</label>
                                <textarea 
                                    className="form-control"
                                    value={genero.descripcion}
                                    onChange={(e) => setGenero({...genero, descripcion: e.target.value})}
                                />
                            </div>

                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-success">
                                    Guardar Género
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
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {listaGeneros.map((gen, index) => (
                        <tr key={gen._id}>
                            <td>{index + 1}</td>
                            <td>{gen.nombre}</td>
                            <td>{gen.descripcion}</td>
                            <td>
                                <span className={`badge ${gen.estado ? 'bg-success' : 'bg-danger'}`}>
                                    {gen.estado ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => borrarGenero(gen._id)}
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

export default Generos;