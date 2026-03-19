import React, { useState, useEffect } from 'react';
import { getDirectores, crearDirector, eliminarDirector } from '../servicios/directorService';

const Directores = () => {

    const [mostrarForm, setMostrarForm] = useState(false);
    const [listaDirectores, setListaDirectores] = useState([]);

    const [director, setDirector] = useState({
        nombres: '',
        estado: 'Activo'
    });

    // 🔥 CARGAR DIRECTORES DESDE API
    const cargarDirectores = async () => {
        try {
            const data = await getDirectores();
            setListaDirectores(data);
        } catch (error) {
            console.error("Error al cargar directores:", error);
        }
    };

    useEffect(() => {
    const cargar = async () => {
        await cargarDirectores();
    };
    cargar();
    }, []);

    // CREAR DIRECTOR
    const manejarGuardar = async (e) => {
        e.preventDefault();

        try {
            await crearDirector({
                nombres: director.nombres,
                estado: director.estado === 'Activo'
            });

            setDirector({ nombres: '', estado: 'Activo' });
            setMostrarForm(false);
            cargarDirectores();
        } catch (error) {
            console.error("Error al crear director:", error);
        }
    };

    //  ELIMINAR
    const borrarDirector = async (id) => {
        if (window.confirm('¿Deseas eliminar este director?')) {
            try {
                await eliminarDirector(id);
                cargarDirectores();
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Gestión de Directores</h2>
                <button 
                    className={`btn ${mostrarForm ? 'btn-secondary' : 'btn-primary'}`} 
                    onClick={() => setMostrarForm(!mostrarForm)}
                >
                    <i className={`bi ${mostrarForm ? 'bi-x-lg' : 'bi-plus-lg'}`}></i> 
                    {mostrarForm ? ' Cancelar' : ' Agregar Director'}
                </button>
            </div>

            {mostrarForm && (
                <div className="card mb-4 shadow-sm border-danger">
                    <div className="card-header bg-danger text-white">
                        <h5 className="mb-0">Nuevo Director</h5>
                    </div>
                    <div className="card-body">
                        <form className="row g-3" onSubmit={manejarGuardar}>
                            <div className="col-md-8">
                                <label className="form-label fw-bold">Nombres</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    value={director.nombres}
                                    onChange={(e) => setDirector({...director, nombres: e.target.value})}
                                    required
                                />
                            </div>

                            <div className="col-md-4">
                                <label className="form-label fw-bold">Estado</label>
                                <select 
                                    className="form-select"
                                    value={director.estado}
                                    onChange={(e) => setDirector({...director, estado: e.target.value})}
                                >
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>

                            <div className="col-12 text-end">
                                <button type="submit" className="btn btn-danger">
                                    Guardar Director
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            
            <table className="table table-striped table-hover shadow-sm">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {listaDirectores.map((dir, index) => (
                        <tr key={dir._id}>
                            <td>{index + 1}</td>
                            <td>{dir.nombres}</td>
                            <td>
                                <span className={`badge ${dir.estado ? 'bg-success' : 'bg-danger'}`}>
                                    {dir.estado ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => borrarDirector(dir._id)}
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

export default Directores;