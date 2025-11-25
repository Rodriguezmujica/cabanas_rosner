
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            login(username, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Credenciales inválidas');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Iniciar Sesión</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Ingresar</button>
                </form>
                <div className="mt-3 text-center text-muted">
                    <small>Admin: admin/admin123 | Cajero: cajero/cajero123</small>
                </div>
            </div>
        </div>
    );
};

export default Login;
