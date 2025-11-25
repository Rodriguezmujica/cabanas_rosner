
const CABINS_KEY = 'cabins_data';
const BOOKINGS_KEY = 'bookings_data';

const INITIAL_CABINS = [
    {
        id: 1,
        name: 'Cabaña 1',
        price: 50000,
        capacity: 6,
        image: '/imagenes/cabin1_main.jpg',
        images: [
            '/imagenes/cabin1_1.jpg',
            '/imagenes/cabin1_2.jpg',
            '/imagenes/cabin1_3.jpg'
        ],
        description: 'Cabaña 1 con amplias comodidades y vistas panorámicas.',
        amenities: [
            'Capacidad para 6',
            'Aire acondicionado',
            'Secador de pelo',
            'Microondas',
            'Horno',
            'Escaleras',
            'Tostadora',
            'Conexión inalámbrica a internet',
            'Escritorio',
            'Mini Frigorífico',
            'Calefacción',
            'Combinación ducha y bañera/spa',
            'Televisión por cable',
            'Cocina completa',
            'TV',
            'Toallas'
        ]
    },
    {
        id: 2,
        name: 'Cabaña del Río',
        price: 80000,
        capacity: 4,
        image: '/imagenes/cabin_river.png',
        description: 'Vista privilegiada al río. Espaciosa y confortable para familias.',
        amenities: ['4 Personas', '2 Habitaciones', 'Calefacción a Leña']
    },
    {
        id: 3,
        name: 'Cabaña Familiar',
        price: 100000,
        capacity: 6,
        image: '/imagenes/cabin_family.png',
        description: 'La opción perfecta para grupos grandes. Quincho incluido.',
        amenities: ['6 Personas', '3 Habitaciones', 'Quincho Privado']
    }
];

export const getCabins = () => {
    const stored = localStorage.getItem(CABINS_KEY);
    if (!stored) {
        localStorage.setItem(CABINS_KEY, JSON.stringify(INITIAL_CABINS));
        return INITIAL_CABINS;
    }
    return JSON.parse(stored);
};

export const getBookings = () => {
    const stored = localStorage.getItem(BOOKINGS_KEY);
    return stored ? JSON.parse(stored) : [];
};

export const addBooking = (booking) => {
    const bookings = getBookings();
    const newBooking = { ...booking, id: Date.now(), status: 'confirmed' };
    bookings.push(newBooking);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    return newBooking;
};

export const checkAvailability = (cabinId, date) => {
    const bookings = getBookings();
    // Simple check: is there a booking for this cabin on this date?
    // Date format assumed: YYYY-MM-DD
    return !bookings.some(b => b.cabinId === cabinId && b.date === date && b.status !== 'cancelled');
};

export const getOccupancyStats = () => {
    const bookings = getBookings();
    const totalBookings = bookings.filter(b => b.status !== 'cancelled').length;
    // Mock calculation
    return {
        totalBookings,
        revenue: bookings.reduce((acc, curr) => acc + curr.price, 0),
        occupancyRate: 75 // Mock percentage
    };
};
