import React, { useState, useEffect } from 'react';
import { getTipos, crearTipo, eliminarTipo } from '../servicios/tipoService';

const Tipos = () => {

    const [mostrarForm, setMostrarForm] = useState(false);
    const [listaTipos, setListaTipos] = useState([]);

    const [tipo, setTipo] = useState({
        nombre: '',
        descripcion: '',
        estado: 'Activo'
    });

    useEffect(() => {
        const cargar = async () => {
            const data = await getTipos();
            setListaTipos(data);
        };
        cargar();
    }, []);

    const manejarGuardar = async (e) => {
        e.preventDefault();

        await crearTipo({
            nombre: tipo.nombre,
            descripcion: tipo.descripcion,
            estado: tipo.estado === 'Activo'
        });

        setTipo({ nombre: '', descripcion: '', estado: 'Activo' });
        setMostrarForm(false);

        const data = await getTipos();
        setListaTipos(data);
    };

    const borrarTipo = async (id) => {
        if (window.confirm('¿Eliminar tipo?')) {
            await eliminarTipo(id);
            const data = await getTipos();
            setListaTipos(data);
        }
    };

    return (
        <div className="container mt-4">

            <div className="d-flex justify-content-between mb-4">
                <h2>Tipos</h2>
                <button className="btn btn-primary" onClick={() => setMostrarForm(!mostrarForm)}>
                    {mostrarForm ? 'Cancelar' : 'Agregar Tipo'}
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={manejarGuardar} className="mb-4">
                    <input placeholder="Nombre" className="form-control mb-2"
                        value={tipo.nombre}
                        onChange={(e) => setTipo({...tipo, nombre: e.target.value})}
                    />
                    <input placeholder="Descripción" className="form-control mb-2"
                        value={tipo.descripcion}
                        onChange={(e) => setTipo({...tipo, descripcion: e.target.value})}
                    />
                    <button className="btn btn-success">Guardar</button>
                </form>
            )}

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {listaTipos.map((t, i) => (
                        <tr key={t._id}>
                            <td>{i+1}</td>
                            <td>{t.nombre}</td>
                            <td>{t.estado ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <button onClick={() => borrarTipo(t._id)} className="btn btn-danger btn-sm">
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Tipos;