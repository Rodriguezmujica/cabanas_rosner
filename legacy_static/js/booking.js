class Cabin {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class BookingManager {
    constructor() {
        this.bookings = []; // Mock database
    }

    isAvailable(cabinName, date) {
        // Mock availability logic: Randomly return true/false for demo purposes
        // In a real app, this would check against a database
        return Math.random() > 0.3; 
    }

    addBooking(booking) {
        this.bookings.push(booking);
        console.log("New booking added:", booking);
        alert(`¡Reserva confirmada para ${booking.cabinName} el ${booking.date}!`);
    }
}

const manager = new BookingManager();
let currentCabin = null;
let currentPrice = 0;

function openBooking(cabinName, price) {
    currentCabin = cabinName;
    currentPrice = price;
    
    const container = document.getElementById('booking-container');
    container.innerHTML = `
        <h3>Reservar ${cabinName}</h3>
        <p>Precio por noche: $${price.toLocaleString('es-CL')}</p>
        <form id="bookingForm">
            <div class="mb-3">
                <label for="bookingDate" class="form-label">Fecha de llegada</label>
                <input type="date" class="form-control" id="bookingDate" required>
            </div>
            <div class="mb-3">
                <label for="nights" class="form-label">Noches</label>
                <input type="number" class="form-control" id="nights" min="1" value="1" required>
            </div>
            <div class="mb-3">
                <label for="guestName" class="form-label">Nombre Completo</label>
                <input type="text" class="form-control" id="guestName" required>
            </div>
            <div class="mb-3">
                <label for="guestEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="guestEmail" required>
            </div>
            <div id="availabilityMsg" class="mt-2"></div>
        </form>
    `;

    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();

    // Attach event listener to Confirm button
    const confirmBtn = document.getElementById('confirmBookingBtn');
    // Remove old listeners to prevent duplicates
    const newBtn = confirmBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newBtn, confirmBtn);
    
    newBtn.addEventListener('click', () => {
        const date = document.getElementById('bookingDate').value;
        const name = document.getElementById('guestName').value;
        
        if (!date || !name) {
            alert("Por favor complete todos los campos requeridos.");
            return;
        }

        if (manager.isAvailable(currentCabin, date)) {
            manager.addBooking({
                cabinName: currentCabin,
                date: date,
                guestName: name
            });
            bootstrap.Modal.getInstance(document.getElementById('bookingModal')).hide();
        } else {
            alert("Lo sentimos, esta cabaña no está disponible en la fecha seleccionada.");
        }
    });
}
