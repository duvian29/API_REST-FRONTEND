import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const opciones = [
        { titulo:'Géneros',ruta:'/generos',icono:'bi-tag-fill',color: 'primary'},
        { titulo:'Productoras',ruta:'/productoras',icono:'bi-building', color:'success' },
        { titulo:'Tipos',ruta:'/tipos',icono:'bi-list-stars',color: 'warning'},
        { titulo:'Directores',ruta:'/directores',icono: 'bi-camera-reels-fill',color:'danger' },
        { titulo:'Media (Películas/Series)',ruta:'/media',icono: 'bi-play-circle-fill',color:'info' }
    ];

    return (
        <div className="container mt-5 text-center">
            <h2 className="mb-4">Bienvenido al Sistema de Gestión</h2>
            <p className="text-muted mb-5">Selecciona una opción para comenzar a administrar tu catálogo</p>
            
            
            <div className="row g-4 justify-content-center">
                {opciones.map((op, index) => (
                    <div className="col-md-4 col-lg-2" key={index}> 
                        <Link to={op.ruta} className="text-decoration-none">
                            <div className={`card h-100 p-3 border-${op.color} shadow-sm hover-effect`}>
                                <i className={`bi ${op.icono} display-5 text-${op.color} mb-3`}></i>
                                <h6 className="fw-bold">{op.titulo}</h6>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;