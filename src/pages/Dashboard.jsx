
import { useState, useEffect } from 'react';
import { getOccupancyStats, getCabins, getBookings, addBooking } from '../services/data';
import { getCurrentUser } from '../services/auth';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
    const user = getCurrentUser();
    const [stats, setStats] = useState({ totalBookings: 0, revenue: 0, occupancyRate: 0 });
    const [bookings, setBookings] = useState([]);
    const [cabins, setCabins] = useState([]);
    const [newBooking, setNewBooking] = useState({
        cabinId: '',
        date: '',
        source: 'local', // local, booking, airbnb
        customerName: ''
    });
    const [msg, setMsg] = useState('');

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setStats(getOccupancyStats());
        setBookings(getBookings());
        setCabins(getCabins());
    };

    const handleAddBooking = (e) => {
        e.preventDefault();
        if (!newBooking.cabinId || !newBooking.date) {
            setMsg('Complete todos los campos');
            return;
        }

        // Check if already booked
        const isTaken = bookings.some(b =>
            b.cabinId === parseInt(newBooking.cabinId) &&
            b.date === newBooking.date &&
            b.status !== 'cancelled'
        );

        if (isTaken) {
            setMsg('❌ Cabaña ocupada en esa fecha');
            return;
        }

        const bookingToAdd = {
            ...newBooking,
            cabinId: parseInt(newBooking.cabinId),
            price: cabins.find(c => c.id === parseInt(newBooking.cabinId))?.price || 0
        };

        addBooking(bookingToAdd);
        setMsg('✅ Reserva agregada correctamente');
        refreshData();
        setNewBooking({ ...newBooking, date: '', customerName: '' });
    };

    // Prepare chart data (mock: bookings per cabin)
    const chartData = cabins.map(c => {
        const count = bookings.filter(b => b.cabinId === c.id).length;
        return { name: c.name, reservas: count };
    });

    return (
        <div className="container my-5">
            <h2 className="mb-4">Panel de Control - {user?.name}</h2>

            {/* Stats Section (Admin Only) */}
            {user?.role === 'admin' && (
                <div className="row mb-5 g-4">
                    <div className="col-md-4">
                        <div className="card h-100 stat-card revenue p-4">
                            <span className="stat-label">Ingresos Estimados</span>
                            <h3 className="stat-value text-primary">${stats.revenue.toLocaleString('es-CL')}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 stat-card bookings p-4">
                            <span className="stat-label">Reservas Totales</span>
                            <h3 className="stat-value text-success">{stats.totalBookings}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 stat-card occupancy p-4">
                            <span className="stat-label">Ocupación</span>
                            <h3 className="stat-value text-warning">{stats.occupancyRate}%</h3>
                        </div>
                    </div>
                </div>
            )}

            {/* Chart Section (Admin Only) */}
            {user?.role === 'admin' && (
                <div className="row mb-5">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-header">Estadísticas de Reservas</div>
                            <div className="card-body" style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="reservas" fill="#0A3D62" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Manual Booking Section */}
            <div className="row mb-5 g-4">
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-header">Nueva Reserva / Bloqueo</div>
                        <div className="card-body">
                            {msg && <div className="alert alert-info">{msg}</div>}
                            <form onSubmit={handleAddBooking}>
                                <div className="mb-3">
                                    <label className="form-label">Cabaña</label>
                                    <select
                                        className="form-select"
                                        value={newBooking.cabinId}
                                        onChange={(e) => setNewBooking({ ...newBooking, cabinId: e.target.value })}
                                        required
                                    >
                                        <option value="">Seleccione...</option>
                                        {cabins.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Fecha</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={newBooking.date}
                                        onChange={(e) => setNewBooking({ ...newBooking, date: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Origen</label>
                                    <select
                                        className="form-select"
                                        value={newBooking.source}
                                        onChange={(e) => setNewBooking({ ...newBooking, source: e.target.value })}
                                    >
                                        <option value="local">Local / Teléfono</option>
                                        <option value="booking">Booking.com</option>
                                        <option value="airbnb">Airbnb</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre Cliente (Opcional)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newBooking.customerName}
                                        onChange={(e) => setNewBooking({ ...newBooking, customerName: e.target.value })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Registrar</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings List */}
                <div className="col-md-6">
                    <div className="card h-100">
                        <div className="card-header">Últimas Reservas</div>
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {bookings.slice(-5).reverse().map((b, idx) => (
                                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 bg-light rounded">
                                        <div>
                                            <strong>{cabins.find(c => c.id === b.cabinId)?.name}</strong>
                                            <br />
                                            <small className="text-muted-small">{b.date} - {b.source.toUpperCase()}</small>
                                        </div>
                                        <span className="badge bg-primary rounded-pill">${b.price.toLocaleString('es-CL')}</span>
                                    </li>
                                ))}
                                {bookings.length === 0 && <li className="list-group-item">No hay reservas registradas.</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
