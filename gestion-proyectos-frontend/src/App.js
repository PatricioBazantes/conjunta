import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Proyectos from './components/Proyectos';
import Empleados from './components/Empleados';
import Tareas from './components/Tareas';
import Crear from './components/Crear';
import Editar from './components/Editar';
import Principal from './components/Principal';
import Login from './components/Login';

const AppContent = ({ isAuthenticated, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRegistrosPage = location.pathname === '/';

  React.useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/principal" style={styles.navLink}>Inicio</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink}>Lista de Registros</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/crear" style={styles.navLink}>Crear Registros</Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/editar" style={styles.navLink}>Editar/Eliminar Registros</Link>
          </li>
          <li style={styles.navItem}>
            <button onClick={onLogout} style={styles.logoutButton}>Salir</button>
          </li>
        </ul>
      </nav>
      {isRegistrosPage && (
        <section className="list-section" style={styles.section}>
          <h2></h2>
          <Proyectos />
          
          <h2></h2>
          <Empleados />
          
          <h2></h2>
          <Tareas />
        </section>
      )}
      <Routes>
        <Route path="/principal" element={<Principal />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/editar" element={<Editar />} />
      </Routes>
      <footer style={styles.footer}>
        <p>Derechos reservados - Bazantes - Cuichan</p>
      </footer>
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="*" element={<AppContent isAuthenticated={isAuthenticated} onLogout={handleLogout} />} />
      </Routes>
    </Router>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#007bff',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  navItem: {
    marginRight: '15px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '22px',
    fontWeight: 'bold',
    padding: '8px 15px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '4px',
    fontSize: '22px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  section: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#a1cffb',
  },
  footer: {
    backgroundColor: '#007bff',
    textAlign: 'center',
    padding: '1px',
    position: 'fixed',
    bottom: '0',
    width: '100%',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    fontWeight: 'bold',
  },
};

export default App;
