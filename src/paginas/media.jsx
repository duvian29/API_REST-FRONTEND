import React, { useState, useEffect } from 'react';
import { getMedia, crearMedia, eliminarMedia } from '../servicios/mediaService';
import { getGeneros } from '../servicios/generoService';
import { getDirectores } from '../servicios/directorService';
import { getProductoras } from '../servicios/productoraService';
import { getTipos } from '../servicios/tipoService';

const Media = () => {

    const [lista, setLista] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [directores, setDirectores] = useState([]);
    const [productoras, setProductoras] = useState([]);
    const [tipos, setTipos] = useState([]);

    const [form, setForm] = useState({
        titulo: '',anio: '',genero: '',director: '',productora: '',tipo: ''
    });

    useEffect(() => {
        const cargar = async () => {
            setLista(await getMedia());
            setGeneros(await getGeneros());
            setDirectores(await getDirectores());
            setProductoras(await getProductoras());
            setTipos(await getTipos());
        };
        cargar();
    }, []);

    const guardar = async (e) => {
        e.preventDefault();

        await crearMedia(form);

        setForm({
            titulo: '',anio: '',genero: '',director: '',productora: '',tipo: ''
        });

        setLista(await getMedia());
    };

    const eliminar = async (id) => {
        await eliminarMedia(id);
        setLista(await getMedia());
    };

    return (
        <div className="container mt-4">

            <h2>Media</h2>

            {/* FORM */}
            <form onSubmit={guardar} className="mb-4">

                <input placeholder="Título" className="form-control mb-2"
                    value={form.titulo}
                    onChange={(e) => setForm({...form, titulo: e.target.value})}
                />

                <input placeholder="Año" className="form-control mb-2"
                    value={form.anio}
                    onChange={(e) => setForm({...form, anio: e.target.value})}
                />

                <select className="form-control mb-2"
                    onChange={(e) => setForm({...form, genero: e.target.value})}>
                    <option>Género</option>
                    {generos.map(g => <option key={g._id} value={g._id}>{g.nombre}</option>)}
                </select>

                <select className="form-control mb-2"
                    onChange={(e) => setForm({...form, director: e.target.value})}>
                    <option>Director</option>
                    {directores.map(d => <option key={d._id} value={d._id}>{d.nombres}</option>)}
                </select>

                <select className="form-control mb-2"
                    onChange={(e) => setForm({...form, productora: e.target.value})}>
                    <option>Productora</option>
                    {productoras.map(p => <option key={p._id} value={p._id}>{p.nombre}</option>)}
                </select>

                <select className="form-control mb-2"
                    onChange={(e) => setForm({...form, tipo: e.target.value})}>
                    <option>Tipo</option>
                    {tipos.map(t => <option key={t._id} value={t._id}>{t.nombre}</option>)}
                </select>

                <button className="btn btn-success">Guardar</button>
            </form>

            
            <table className="table">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Año</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map(m => (
                        <tr key={m._id}>
                            <td>{m.titulo}</td>
                            <td>{m.anio}</td>
                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => eliminar(m._id)}>
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

export default Media;