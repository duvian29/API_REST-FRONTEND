import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Generos from './paginas/generos'; 
import Home from './paginas/Home';
import Tipos from './paginas/tipos';
import Productoras from './paginas/productoras';
import Directores from './paginas/directores'; 
import Media from './paginas/media'; 

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fs-3 fw-bold" to="/">🎬 Gestión Películas</Link>
          
          <div className="collapse navbar-collapse show">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/media"><i className="bi bi-play-circle-fill me-1"></i> Media</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/generos"><i className="bi bi-tag-fill me-1"></i> Géneros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tipos"><i className="bi bi-film me-1"></i> Tipos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productoras"><i className="bi bi-building me-1"></i> Productoras</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/directores"><i className="bi bi-camera-reels-fill me-1"></i> Directores</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/generos" element={<Generos />} />
          <Route path="/tipos" element={<Tipos />} />
          <Route path="/productoras" element={<Productoras />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;