
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/auth';

const Navbar = () => {
    const user = getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <span className="h3">🏡 Cabañas Rosner</span>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#cabanas">Nuestras Cabañas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#servicios">Servicios</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#contacto">Contacto</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {user ? (
                            <div className="dropdown">
                                <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                                    Hola, {user.name}
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button></li>
                                </ul>
                            </div>
                        ) : (
                            <Link className="btn btn-outline-success" to="/login">Ingreso Admin</Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
