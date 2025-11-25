import { useState } from 'react';
import { getCabins, checkAvailability } from '../services/data';
import { Modal, Button } from 'react-bootstrap';

const Home = () => {
    const cabins = getCabins();
    const [showModal, setShowModal] = useState(false);
    const [selectedCabin, setSelectedCabin] = useState(null);
    const [checkDate, setCheckDate] = useState('');
    const [availabilityMsg, setAvailabilityMsg] = useState('');

    const handleOpenBooking = (cabin) => {
        setSelectedCabin(cabin);
        setCheckDate('');
        setAvailabilityMsg('');
        setShowModal(true);
    };

    const handleCheckAvailability = () => {
        if (!checkDate) {
            setAvailabilityMsg('Por favor seleccione una fecha.');
            return;
        }
        const isAvailable = checkAvailability(selectedCabin.id, checkDate);
        if (isAvailable) {
            setAvailabilityMsg('✅ ¡Disponible! Contacte al +56 9 1234 5678 para reservar.');
        } else {
            setAvailabilityMsg('❌ No disponible en esta fecha.');
        }
    };

    return (
        <div className="container my-5">
            <div className="row text-center mb-5">
                <div className="col-12">
                    <h1>Bienvenidos a Cabañas Rosner</h1>
                    <p className="lead">Relájate en medio de la naturaleza con todas las comodidades.</p>
                </div>
            </div>

            <div id="cabanas" className="row row-cols-1 row-cols-md-3 g-4">
                {cabins.map(cabin => (
                    <div className="col" key={cabin.id}>
                        <div className="card h-100 shadow-sm">
                            {cabin.images && cabin.images.length > 0 ? (
                                <div id={`carousel-${cabin.id}`} className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {cabin.images.map((img, idx) => (
                                            <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                                                <img src={img} className="d-block w-100" alt={`${cabin.name} ${idx + 1}`} style={{ height: '200px', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                    <button className="carousel-control-prev" type="button" data-bs-target={`#carousel-${cabin.id}`} data-bs-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Previous</span>
                                    </button>
                                    <button className="carousel-control-next" type="button" data-bs-target={`#carousel-${cabin.id}`} data-bs-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="visually-hidden">Next</span>
                                    </button>
                                </div>
                            ) : (
                                <img src={cabin.image} className="card-img-top" alt={cabin.name} style={{ height: '200px', objectFit: 'cover' }} />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{cabin.name}</h5>
                                <p className="card-text">{cabin.description}</p>
                                <ul className="list-unstyled">
                                    {cabin.amenities.map((amenity, idx) => (
                                        <li key={idx}>• {amenity}</li>
                                    ))}
                                </ul>
                                <p className="h5 text-success">${cabin.price.toLocaleString('es-CL')} / noche</p>
                            </div>
                            <div className="card-footer bg-transparent border-top-0">
                                <button className="btn btn-primary w-100" onClick={() => handleOpenBooking(cabin)}>
                                    Ver Disponibilidad
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div id="servicios" className="row my-5">
                <div className="col-12 text-center">
                    <h2 className="mb-4">Nuestros Servicios</h2>
                </div>
                <div className="col-md-4 text-center">
                    <h3>🅿️</h3>
                    <h4>Estacionamiento</h4>
                    <p>Estacionamiento privado y seguro para cada cabaña.</p>
                </div>
                <div className="col-md-4 text-center">
                    <h3>📶</h3>
                    <h4>Wi-Fi Gratis</h4>
                    <p>Conexión a internet de alta velocidad en todo el recinto.</p>
                </div>
                <div className="col-md-4 text-center">
                    <h3>🌳</h3>
                    <h4>Áreas Verdes</h4>
                    <p>Amplios jardines y senderos para caminar.</p>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reservar {selectedCabin?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Seleccione una fecha para consultar disponibilidad:</p>
                    <input
                        type="date"
                        className="form-control mb-3"
                        value={checkDate}
                        onChange={(e) => setCheckDate(e.target.value)}
                    />
                    {availabilityMsg && (
                        <div className={`alert ${availabilityMsg.includes('✅') ? 'alert-success' : 'alert-danger'}`}>{availabilityMsg}</div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleCheckAvailability}>
                        Consultar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;
