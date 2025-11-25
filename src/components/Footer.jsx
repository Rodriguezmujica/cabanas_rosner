
const Footer = () => {
    return (
        <footer id="contacto" className="bg-dark text-white py-4 mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <h3>Sobre Nosotros</h3>
                        <p>Cabañas El Descanso. Un lugar mágico en el sur de Chile para desconectarse y disfrutar de la naturaleza.</p>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h3>Contacto</h3>
                        <ul className="list-unstyled">
                            <li>📞 <a href="tel:+56912345678" className="text-white text-decoration-none">+56 9 1234 5678</a></li>
                            <li>📧 <a href="mailto:contacto@cabanaseldescanso.cl" className="text-white text-decoration-none">contacto@cabanaseldescanso.cl</a></li>
                            <li>📍 Valdivia, Los Ríos, Chile</li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3">
                        <h3>Redes Sociales</h3>
                        <ul className="list-unstyled d-flex gap-3">
                            <li><a href="#" className="text-white">Facebook</a></li>
                            <li><a href="#" className="text-white">Instagram</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 text-center">
                        <p className="mb-0">Derechos Reservados © 2023 | Cabañas El Descanso</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
